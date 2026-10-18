# frozen_string_literal: true

module Jekyll
  module TerminalFilters
    SGR_CODES = {
      'reset' => 0,
      'bold' => 1,
      'dim' => 2,
      'italic' => 3,
      'underline' => 4,
      'red' => 31,
      'green' => 32,
      'yellow' => 33,
      'blue' => 34,
      'magenta' => 35,
      'cyan' => 36
    }.freeze

    def ansi(input, styles)
      codes = styles.to_s.split(/[\s,]+/).map { |style| SGR_CODES.fetch(style) }
      "\e[#{codes.join(';')}m#{input}\e[0m"
    end

    def wrap(input, width, indent = 0)
      margin = ' ' * indent.to_i
      lines = input.to_s.split.each_with_object([+'']) do |word, acc|
        acc << +'' if !acc.last.empty? && acc.last.length + word.length + 1 > width.to_i - indent.to_i
        acc.last << ' ' unless acc.last.empty?
        acc.last << word
      end
      lines.map { |line| margin + line }.join("\n")
    end

    def delimit(input)
      input.to_s.reverse.scan(/\d{1,3}/).join(',').reverse
    end

    def sentence(input)
      text = input.to_s.strip
      text.end_with?('.', '!', '?') ? text : "#{text}."
    end

    def pad(input, width)
      "#{input} ".ljust(width.to_i)
    end
  end
end

Liquid::Template.register_filter(Jekyll::TerminalFilters)
