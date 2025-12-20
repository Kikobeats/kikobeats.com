# frozen_string_literal: true

require 'open-uri'
require 'fileutils'
require 'cgi'
require 'net/http'

module Jekyll
  class OgImageGenerator < Generator
    safe true
    priority :low

    def generate(site)
      Jekyll.logger.info "OG Image:", "Starting generation..."
      @site = site
      @config = site.config['og_image'] || {}
      @base_url = @config['base_url'] || 'https://og.kikobeats.com'
      @output_dir = @config['output_dir'] || 'images/og'
      @force = @config['force'] || false

      process_collection(site.posts.docs, 'posts')
      process_collection(site.pages.reject { |p| !p.html? }, 'pages')
      Jekyll.logger.info "OG Image:", "Finished."
    end

    private

    def process_collection(items, type)
      Jekyll.logger.info "OG Image:", "Processing #{items.size} #{type}..."
      items.each do |item|
        # Fix for Jekyll::Page not having basename_without_ext
        item_basename = item.respond_to?(:basename_without_ext) ? item.basename_without_ext : File.basename(item.name, ".*")
        slug = item.data['slug'] || item_basename || item.name.split('.').first
        filename = "#{slug}.png"

        # Local paths
        relative_path = File.join(@output_dir, type, filename)
        absolute_path = File.join(@site.source, relative_path)

        # Ensure directory exists
        FileUtils.mkdir_p(File.dirname(absolute_path))

        # Don't generate OG image if post is marked as "external"
        if item.data['external']
          Jekyll.logger.debug "OG Image:", "Skipping #{filename}, post is external."
          next
        end

        # Don't perform request if post does not have an image
        bg_image_path = item.data['image'].is_a?(String) ? item.data['image'] : item.data['background_image']

        if bg_image_path.nil? || bg_image_path.empty?
          Jekyll.logger.debug "OG Image:", "Skipping #{filename}, no background image provided."
          next
        end

        # Check if we need to download
        # Logic: Download if file doesn't exist OR if force is true (global or per-item)
        force_item = item.data.dig('og_image', 'force') || item.data['force']
        should_download = !File.exist?(absolute_path) || @force || force_item

        if should_download
          download_image(item, absolute_path)
        else
          Jekyll.logger.debug "OG Image:", "Skipping #{filename}, already exists."
        end

        # Update metadata for SEO tag and other layouts
        if File.exist?(absolute_path)
          # If image is a string (the background image), we move it to background_image
          # so we can use page.image for the generated OG image.
          if item.data['image'].is_a?(String)
            item.data['background_image'] = item.data['image']
          end

          item.data['image'] = { 'path' => "/#{relative_path}" }
          item.data['og_image_local'] = "/#{relative_path}"

          # Add to static files so it's copied to _site if not already there
          unless @site.static_files.any? { |f| f.relative_path == "/#{relative_path}" }
            @site.static_files << StaticFile.new(@site, @site.source, File.dirname(relative_path), filename)
          end
        end
      end
    end

    def download_image(item, dest)
      item_basename = item.respond_to?(:basename_without_ext) ? item.basename_without_ext : File.basename(item.name, ".*")
      title = item.data['title'] || item_basename || item.name.split('.').first
      bg_image_path = item.data['image'].is_a?(String) ? item.data['image'] : item.data['background_image']

      # Construct the external service URL
      uri = URI.parse("#{@base_url.sub(/\/$/, '')}/")
      uri.query = URI.encode_www_form({ title: title })

      # Generate curl command for debugging
      curl_args = ["curl -X POST '#{uri}'"]
      if bg_image_path
        if bg_image_path.start_with?('http')
          curl_args << "--data-binary '@(remote)'"
        else
          curl_args << "--data-binary '@#{bg_image_path}'"
        end
      end
      Jekyll.logger.info "OG Image:", "Fetch: #{curl_args.join(' ')}"

      begin
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true if uri.scheme == 'https'

        request = Net::HTTP::Post.new(uri.request_uri)

        if bg_image_path
          if bg_image_path.start_with?('http')
            request.body = URI.open(bg_image_path).read
          else
            full_bg_path = File.join(@site.source, bg_image_path)
            if File.exist?(full_bg_path)
              request.body = File.read(full_bg_path)
              request.content_type = 'application/octet-stream'
            else
              Jekyll.logger.warn "OG Image:", "Background image not found: #{full_bg_path}"
            end
          end
        end

        response = http.request(request)

        if response.is_a?(Net::HTTPSuccess)
          File.open(dest, 'wb') do |file|
            file.write(response.body)
          end
          Jekyll.logger.info "OG Image:", "Saved to #{dest}"
        else
          Jekyll.logger.error "OG Image:", "Failed to fetch image for #{item.url}: #{response.code} #{response.message}"
        end
      rescue => e
        Jekyll.logger.error "OG Image:", "Failed to fetch image for #{item.url}: #{e.message}"
      end
    end
  end
end
