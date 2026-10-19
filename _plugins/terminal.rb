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

    COMPACT_UNITS = [['B', 1e9], ['M', 1e6], ['K', 1e3]].freeze
    COMPACT_DECIMALS_BELOW = 10
    COMPACT_ROUNDS_UP_FROM = 0.9995

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

    def compact(input)
      return '' if input.nil?

      number = input.to_f
      unit, divisor = COMPACT_UNITS.find { |_, value| number >= value * COMPACT_ROUNDS_UP_FROM } || ['', 1]
      scaled = number / divisor
      digits = scaled < COMPACT_DECIMALS_BELOW ? 1 : 0
      "#{format("%.#{digits}f", scaled).sub(/\.0$/, '')}#{unit}"
    end

    def metric_link(url, value, unit, width)
      return ansi(url, 'blue') if value.to_s.empty?

      "#{ansi(pad(url, width), 'blue')}#{ansi(value, 'bold')} #{ansi(unit, 'dim')}"
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
