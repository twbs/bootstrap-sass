# Bootstrap for Sass

`bootstrap-sass` is an Sass-powered version of [Twitter's Bootstrap](http://github.com/twitter/bootstrap), ready to drop right into your Sass powered applications.

## Usage

### Rails

In your Gemfile:

```ruby
gem 'sass-rails',   '~> 3.2.3'
gem 'bootstrap-sass', :git => 'git://github.com/intridea/bootstrap-sass.git', :branch => '3.0.0-wip'
```

`bundle install` and restart your server to make the files available.

## Upstream Converter

Keeping bootstrap-sass in sync with upsteam changes from Bootstrap is an error prone and time consuming manual process.
This branch is specifically concerned with automating that process as much as possible to allow a much faster release cycle.

Upsteam changes to the Twitter Bootstrap project can now be pulled in using the `convert` rake task.

Here's an example run that would pull down the `3.0.0-wip` branch from the main twitter/bootstrap repo:

    % bundle exec rake 'convert[3.0.0-wip]'

The latest converter script is located [here](https://github.com/intridea/bootstrap-sass/blob/3.0.0-wip/tasks/converter.rb) and does the following:

* Converts upsteam bootstrap Less files to its matching Scss file.
* Copies all upstream javascripts into `vendor/assets/javascripts/bootstrap`
* Generates a javascript manifest at `vendor/assets/javascripts/bootstrap.js`
* Copies all upstream font files into `vendor/assets/fonts`

This less to scss conversion is pretty good, but not perfect. So manual fixes to the resulting Scss will necessary for now.
See [these github issues](https://github.com/intridea/bootstrap-sass/issues?labels=converter&state=open) tagged with `conversion` which track the current shortcomings of the conversion process.

## Who
bootstrap-sass is a project by [Thomas McDonald](https://twitter.com/#!/thomasmcdonald_), with support from [other awesome people](https://github.com/thomas-mcdonald/bootstrap-sass/graphs/contributors).
