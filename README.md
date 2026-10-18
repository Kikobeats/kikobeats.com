## How to setup Ruby

- Install [chruby](https://github.com/postmodern/chruby) (or [chruby-fish](https://github.com/JeanMertz/chruby-fish)), and [ruby-install](https://github.com/postmodern/ruby-install).
- Declare the ruby version to use e.g., `echo "ruby-2.7.5" > .ruby-version`.

## Terminal homepage

`curl kikobeats.com` returns an ANSI-colored text version of the homepage.

- `index.txt` is the template, built to `/index.txt` with the filters in `_plugins/terminal.rb`.
- `vercel.json` rewrites `/` to `/index.txt` when the `User-Agent` starts with `curl/`, `HTTPie/` or `xh/`.
- Send `X-Original: true` to get the regular HTML: `curl -H 'X-Original: true' kikobeats.com`.
- `npm test` checks the filters and that every line of the built page fits in 80 columns.
