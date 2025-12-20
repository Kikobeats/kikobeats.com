# frozen_string_literal: true

Jekyll::Hooks.register :site, :after_init do |site|
  # Vercel sets VERCEL_URL for all deployments.
  # For preview deployments, we want to use the preview URL so OG tags work correctly.
  if ENV['VERCEL'] && ENV['VERCEL_URL'] && ENV['VERCEL_ENV'] != 'production'
    vercel_url = "https://#{ENV['VERCEL_URL']}"
    Jekyll.logger.info "Vercel:", "Overriding site.url with #{vercel_url} (env: #{ENV['VERCEL_ENV']})"
    site.config['url'] = vercel_url
  end
end
