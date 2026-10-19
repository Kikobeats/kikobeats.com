# frozen_string_literal: true

require 'minitest/autorun'
require 'jekyll'
require_relative '../_plugins/terminal'

class TerminalFiltersTest < Minitest::Test
  include Jekyll::TerminalFilters

  ESCAPE_SEQUENCE = /\e\[[\d;]*m/.freeze
  BUILT_PAGE = File.expand_path('../_site/index.txt', __dir__)
  MAX_COLUMNS = 80

  def test_ansi_wraps_input_with_sgr_codes
    assert_equal "\e[1;35mRUNNING\e[0m", ansi('RUNNING', 'bold, magenta')
  end

  def test_ansi_rejects_unknown_style
    assert_raises(KeyError) { ansi('x', 'blink') }
  end

  def test_wrap_breaks_on_word_boundaries_with_indent
    assert_equal "  aaa bbb\n  ccc", wrap('aaa bbb ccc', 10, 2)
  end

  def test_wrap_keeps_words_longer_than_width
    assert_equal '  https://example.com/very/long', wrap('https://example.com/very/long', 10, 2)
  end

  def test_delimit_groups_thousands
    assert_equal '2,943', delimit(2943)
    assert_equal '834', delimit(834)
    assert_equal '1,211,396,488', delimit(1_211_396_488)
  end

  def test_compact_abbreviates_like_a_dashboard
    assert_equal '835', compact(835)
    assert_equal '19K', compact(19_024)
    assert_equal '1.5K', compact(1_480)
    assert_equal '95M', compact(95_123_456)
    assert_equal '1.2B', compact(1_236_726_902)
    assert_equal '1M', compact(999_950)
    assert_equal '', compact(nil)
  end

  def test_metric_link_aligns_value_after_padded_url
    assert_equal "\e[34mhttps://a.io  \e[0m\e[1m5\e[0m \e[2mreqs/mo\e[0m", metric_link('https://a.io', '5', 'reqs/mo', 14)
  end

  def test_metric_link_shows_bare_url_without_value
    assert_equal "\e[34mhttps://a.io\e[0m", metric_link('https://a.io', '', 'reqs/mo', 14)
    assert_equal "\e[34mhttps://a.io\e[0m", metric_link('https://a.io', nil, 'reqs/mo', 14)
  end

  def test_sentence_adds_missing_period_only
    assert_equal 'Done.', sentence('Done')
    assert_equal 'Done!', sentence('Done!')
  end

  def test_pad_always_leaves_a_separator
    assert_equal 'ab  ', pad('ab', 4)
    assert_equal 'abcdef ', pad('abcdef', 4)
  end

  def test_built_page_fits_terminal_and_has_no_liquid
    skip 'run `npm run build` first' unless File.exist?(BUILT_PAGE)
    page = File.read(BUILT_PAGE)
    refute_match(/\{[{%]/, page)
    page.each_line do |line|
      visible = line.chomp.gsub(ESCAPE_SEQUENCE, '')
      assert visible.length <= MAX_COLUMNS, "line exceeds #{MAX_COLUMNS} columns: #{visible}"
    end
  end

  def test_built_page_has_compact_spacing
    skip 'run `npm run build` first' unless File.exist?(BUILT_PAGE)
    page = File.read(BUILT_PAGE)
    refute page.start_with?("\n"), 'page starts with a blank line'
    refute_match(/\n[ \t]*\n[ \t]*\n/, page, 'page has consecutive blank lines')
    assert page.end_with?("\n") && !page.end_with?("\n\n"), 'page must end with exactly one newline'
  end
end
