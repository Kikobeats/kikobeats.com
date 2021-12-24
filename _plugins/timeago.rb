module Jekyll
  module TimeAgo
    def timeago(date)
      n = (DateTime.now - Date.parse(date.to_s)).to_i
      n > 0 ? "#{n} days ago" : "today"
    end
  end
end

Liquid::Template.register_filter(Jekyll::TimeAgo)
