# Bootstrap for Sass

`bootstrap-sass` is an Sass-powered version of [Bootstrap](https://github.com/twbs/bootstrap), ready to drop right into your Sass powered applications.

## Usage

### Rails

In your Gemfile:

```ruby
gem 'sass-rails',   '~> 3.2.3'
gem 'bootstrap-sass', :git => 'git://github.com/thomas-mcdonald/bootstrap-sass.git', :branch => '3'
```

`bundle install` and restart your server to make the files available.

then include bootstrap in your application.css.scss file with `@import 'bootstrap';`

## Upstream Converter

Keeping bootstrap-sass in sync with upstream changes from Bootstrap is an error prone and time consuming manual process.
This branch is specifically concerned with automating that process as much as possible to allow a much faster release cycle.

Upstream changes to the Bootstrap project can now be pulled in using the `convert` rake task.

Here's an example run that would pull down the `3.0.0-wip` branch from the main twbs/bootstrap repo:

    % bundle exec rake 'convert[3.0.0-wip]'

The latest converter script is located [here](https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/tasks/converter.rb) and does the following:

* Converts upstream bootstrap LESS files to its matching SCSS file.
* Copies all upstream JavaScript into `vendor/assets/javascripts/bootstrap`
* Generates a javascript manifest at `vendor/assets/javascripts/bootstrap.js`
* Copies all upstream font files into `vendor/assets/fonts`

This LESS to SCSS conversion is pretty good, but not perfect. So manual fixes to the resulting SCSS will be necessary for now.
Please submit GitHub issues tagged with `conversion` to help track current shortcomings of the conversion process.

## Who
bootstrap-sass is a project by [Thomas McDonald](https://twitter.com/#!/thomasmcdonald_), with support from [other awesome people](https://github.com/thomas-mcdonald/bootstrap-sass/graphs/contributors).
