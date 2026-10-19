## How to setup Ruby

- Install [chruby](https://github.com/postmodern/chruby) (or [chruby-fish](https://github.com/JeanMertz/chruby-fish)), and [ruby-install](https://github.com/postmodern/ruby-install).
- Declare the ruby version to use e.g., `echo "ruby-2.7.5" > .ruby-version`.

## Terminal homepage

`curl kikobeats.com` returns an ANSI-colored text version of the homepage.

- `index.txt` is the template, built to `/index.txt` with the filters in `_plugins/terminal.rb`.
- `vercel.json` routes `/` to `/index.txt` when the `User-Agent` starts with `curl/`, `HTTPie/` or `xh/`.
- Send `X-Original: true` to get the regular HTML: `curl -H 'X-Original: true' kikobeats.com`.
- Numbers next to the links come from `_data/numbers.json`, written at install by `scripts/fetch-numbers.js`: GitHub stars and npm downloads of the last month summed over `_data/oss.json`, X followers from FxTwitter, and Cloudflare requests of the last 30 days per zone, matched to each Running entry by its link hostname. The Cloudflare numbers need `CLOUDFLARE_API_TOKEN` (Zone Read, Analytics Read). A number that can't be fetched is hidden, and the build logs a warning.
- `npm test` checks the filters and, after `npm run build`, that every line of the built page fits in 80 columns.

### Cloudflare

Plain `curl kikobeats.com` uses `http://`. Two Cloudflare pieces keep that request away from Vercel's forced HTTP to HTTPS redirect:

- Redirect rule `curl without protocol`: 301 to HTTPS for every `not ssl` request, except `/` from `curl/`, `HTTPie/` or `xh/`.
- Snippet `terminal_homepage_https` (rule `not ssl and http.request.uri.path eq "/"`): refetches the page over HTTPS, so Vercel never sees HTTP:

```js
export default {
  async fetch (request) {
    const url = new URL(request.url)
    url.protocol = 'https:'
    return fetch(new Request(url, request))
  }
}
```
