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
      @config = site.config['og_image'] || {}
      log_level = (@config['log_level'] || 'info').to_s.downcase

      case log_level
      when 'debug' then Jekyll.logger.adjust_verbosity(verbose: true)
      when 'error' then Jekyll.logger.adjust_verbosity(quiet: true)
      end

      log "Starting generation..."
      @site = site
      @base_url = @config['base_url'] || 'https://og.kikobeats.com'
      @output_dir = @config['output_dir'] || 'images/og'
      @force = @config['force'] || false
      @generated_count = 0
      @skipped_count = 0

      process_collection(site.posts.docs, 'posts')
      process_collection(site.pages.reject { |p| !p.html? }, 'pages')
      log "Finished (#{@generated_count} generated, #{@skipped_count} skipped)."
    end

    private

    def log(msg, level = :info)
      severity = { debug: 0, info: 1, warn: 2, error: 3 }
      current_level = severity[(@config['log_level'] || 'info').to_s.downcase.to_sym] || 1
      requested_level = severity[level] || 1

      Jekyll.logger.send(level, "OG Image:", msg) if requested_level >= current_level
    end

    def process_collection(items, type)
      log "Processing #{items.size} #{type}...", :debug
      items.each do |item|
        # Special logic for pages
        if type == 'pages'
          log "Processing item with url: #{item.url}", :debug
          title_map = @config['title_map'] || {}
          url_key = item.url.sub(/\/$/, '')
          url_key = '/' if url_key == ''
          mapped_title = title_map[url_key]

          if mapped_title
            item.data['title'] ||= mapped_title
          else
            raise "OG Image: No title mapping found for page #{item.url} in _config.yml. Please add it to og_image.title_map"
          end
          item.data['image'] ||= 'images/hero-header.jpg'
        end

        # Fix for Jekyll::Page not having basename_without_ext
        item_basename = item.respond_to?(:basename_without_ext) ? item.basename_without_ext : File.basename(item.name, ".*")

        # Use a more unique slug for pages to avoid collisions (e.g. multiple index.md files)
        if type == 'pages'
          page_slug = item.url.sub(/\/index\.html$/, '/').gsub(/^\/|\/$/, '').gsub('/', '-')
          page_slug = 'index' if page_slug.empty?
          slug = item.data['slug'] || page_slug
        else
          slug = item.data['slug'] || item_basename || item.name.split('.').first
        end

        filename = "#{slug}.png"

        # Local paths
        relative_path = File.join(@output_dir, type, filename)
        absolute_path = File.join(@site.source, relative_path)

        # Ensure directory exists
        FileUtils.mkdir_p(File.dirname(absolute_path))

        # Don't generate OG image if post is marked as "external"
        if item.data['external']
          log "Skipping #{filename}, post is external.", :debug
          next
        end

        # Don't perform request if post does not have an image
        bg_image_path = item.data['image'].is_a?(String) ? item.data['image'] : item.data['background_image']

        if bg_image_path.nil? || bg_image_path.empty?
          log "Skipping #{filename}, no background image provided.", :debug
          next
        end

        # Check if we need to download
        # Logic: Download if file doesn't exist OR if force is true (global or per-item)
        force_item = item.data.dig('og_image', 'force') || item.data['force']
        should_download = !File.exist?(absolute_path) || @force || force_item

        if should_download
          download_image(item, absolute_path)
        else
          log "Skipping #{filename}, already exists.", :debug
          @skipped_count += 1
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
      curl_cmd = curl_args.join(' ')
      log "Fetch: #{curl_cmd}", :debug

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
              log "Background image not found: #{full_bg_path}", :warn
            end
          end
        end

        response = http.request(request)

        if response.is_a?(Net::HTTPSuccess)
          File.open(dest, 'wb') do |file|
            file.write(response.body)
          end
          log "Saved to #{dest}"
          @generated_count += 1
        else
          log "Failed to fetch image for #{item.url}: #{response.code} #{response.message}", :error
          log " - Reproduce with: #{curl_cmd}", :error
        end
      rescue => e
        log "Failed to fetch image for #{item.url}: #{e.message}", :error
        log " - Reproduce with: #{curl_cmd}", :error
      end
    end
  end
end
