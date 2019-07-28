module Jekyll
  module TimeAgo
    def timeago(date)
      n = (DateTime.now - Date.parse(date.to_s)).to_i
      "#{n} days ago"
    end
  end
end

Liquid::Template.register_filter(Jekyll::TimeAgo)
