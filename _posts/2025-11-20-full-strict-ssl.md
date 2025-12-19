---
layout: post
title: K8s wildcard SSL
date: '2025-11-20'
og_image:
  canvas:
    background_image: /images/k8s-wildcard-ssl/header.jpeg
---

Managing SSL certificates manually is a pain. This guide shows how to automate wildcard SSL certificates (`*.yourdomain.com`) on Kubernetes using `cert-manager`, Let's Encrypt, and Cloudflare DNS validation.

## Install ingress-nginx

First, we need an Ingress Controller. `ingress-nginx` acts as the entry point for your cluster, receiving external traffic and routing it to your internal services. Crucially, it also handles SSL termination, meaning it decrypts HTTPS traffic before passing it to your application.

We'll use Helm to install it:

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  --set controller.publishService.enabled=true
```

After installation, your cloud provider (DigitalOcean, AWS, etc.) will provision a Load Balancer. Wait for it to be assigned an external IP:

```bash
kubectl get svc -n ingress-nginx
```

Look for the `EXTERNAL-IP`. This is the IP address you should configure in your DNS records (e.g., an A record for `*.yourdomain.com` pointing to this IP).

## Install cert-manager

Next, we install `cert-manager`. This Kubernetes controller watches for certificate requests and communicates with Issuers (like Let's Encrypt) to obtain signed certificates. It handles the complex negotiation and ensures certificates are renewed before they expire.

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true
```

Verify the pods are running:

```bash
kubectl get pods -n cert-manager
```

## Create Cloudflare API token

To issue a **wildcard** certificate (e.g., `*.microlink.io`), Let's Encrypt requires a **DNS-01 Challenge**. Unlike the HTTP-01 challenge (which verifies ownership by checking a file on a web server), the DNS-01 challenge requires you to create a specific DNS TXT record.

To automate this, `cert-manager` needs permission to modify your DNS records.

1. Go to [Cloudflare Dashboard → Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) and click **Create Token**.
2. Choose the **"Edit zone DNS"** preset.
3. Under `Zone Resources`, select the specific domain you are targeting (e.g., `microlink.io`).

```text
Include → Specific Zone → microlink.io
```

4. Click "Continue to summary" → "Create Token" and copy the token.

## Store Cloudflare API token as K8s secret

Kubernetes needs to access this token securely to communicate with the Cloudflare API. We'll store it as a Secret in the `cert-manager` namespace.

Replace `<YOUR_TOKEN>` with the actual token you copied:

```bash
kubectl create secret generic cloudflare-api-token-secret \
  --namespace cert-manager \
  --from-literal=api-token='<YOUR_TOKEN>'
```

Verify the secret exists:

```bash
kubectl get secret cloudflare-api-token-secret -n cert-manager
```

## Create ClusterIssuer

A `ClusterIssuer` is a Kubernetes resource that tells `cert-manager` *who* to ask for certificates (Let's Encrypt) and *how* to verify ownership (using the Cloudflare DNS challenge).

We use a `ClusterIssuer` (instead of a namespace-scoped `Issuer`) so we can use it to issue certificates across all namespaces in the cluster.

Create `cert-manager/cluster-issuer.yaml`:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
spec:
  acme:
    email: YOUR@EMAIL.COM
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-account-key
    solvers:
    - dns01:
        cloudflare:
          apiTokenSecretRef:
            name: cloudflare-api-token-secret
            key: api-token
```

Apply it to the cluster:

```bash
kubectl apply -f cluster-issuer.yaml
```

Check its status to ensure it's ready:

```bash
kubectl describe clusterissuer letsencrypt
```

## Create Wildcard Certificate

Now we explicitly request the certificate. We'll define a `Certificate` resource that specifies the domains we want (`microlink.io` and `*.microlink.io`) and points to the `ClusterIssuer` we just created.

Create `infra/cert-manager/certificate.yaml`:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: microlink-wildcard-cert
  namespace: default
spec:
  secretName: microlink-wildcard-tls
  dnsNames:
    - "microlink.io"
    - "*.microlink.io"
  issuerRef:
    name: letsencrypt
    kind: ClusterIssuer
```

Apply the certificate request:

```bash
kubectl apply -f infra/cert-manager/certificate.yaml
```

`cert-manager` will now start the DNS challenge process. You can watch the status:

```bash
kubectl describe certificate microlink-wildcard-cert
```

Once successful, the signed certificate and private key will be stored in a secret named `microlink-wildcard-tls`.

```bash
kubectl get secret microlink-wildcard-tls
```

## Ingress with wildcard hosts

Finally, we configure our Ingress resource to use the generated certificate. The `tls` section references the `microlink-wildcard-tls` secret, ensuring that traffic matching our hosts is served over HTTPS.

Create `infra/ingress-nginx/ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: microlink-ingress
  namespace: default
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  tls:
    - hosts:
        - "microlink.io"
        - "*.microlink.io"
      secretName: microlink-wildcard-tls
  rules:
    - host: "microlink.io"
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: microlink
                port:
                  name: http
    - host: "*.microlink.io"
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: microlink
                port:
                  name: http
```

Apply the ingress configuration:

```bash
kubectl apply -f infra/ingress-nginx/ingress.yaml 
```

Your service is now accessible via HTTPS with a valid wildcard certificate!
