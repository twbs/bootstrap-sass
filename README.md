# Bootstrap for Sass

[![Build Status](https://secure.travis-ci.org/thomas-mcdonald/bootstrap-sass.png?branch=master)](http://travis-ci.org/thomas-mcdonald/bootstrap-sass) [![Code Climate](https://codeclimate.com/github/thomas-mcdonald/bootstrap-sass.png)](https://codeclimate.com/github/thomas-mcdonald/bootstrap-sass)

`bootstrap-sass` is an Sass-powered version of [Bootstrap](http://github.com/twbs/bootstrap), ready to drop right into your Sass powered applications.

## Installation and Usage

Please see the appropriate guide for your environment of choice:

### Rails

`bootstrap-sass` is easy to drop into Rails with the asset pipeline.

#### Installation

In your Gemfile you need to add the `bootstrap-sass` gem, and ensure that the `sass-rails` gem is present - it is added to new Rails applications by default

```ruby
gem 'sass-rails', '>= 3.2' # sass-rails needs to be higher than 3.2
gem 'bootstrap-sass', '~> 2.3.2.1'
```

`bundle install` and restart your server to make the files available through the pipeline.

#### Usage

##### CSS

Import Bootstrap in an SCSS file (for example, `application.css.scss`) to get all of Bootstrap's styles, mixins and variables! We recommend against using `//= require` directives, since none of your other stylesheets will be [able to access][antirequire] the Bootstrap mixins or variables.

```css
@import "bootstrap";
```

You can also include optional bootstrap theme:

```css
@import "bootstrap/theme";
```

##### Javascripts

We have a helper that includes all Bootstrap javascripts. Put this in your Javascript manifest (usually in `application.js`) to

```js
// Loads all Bootstrap javascripts
//= require bootstrap
```

You can also load individual modules, provided you also require any dependencies. You can check dependencies in the [Bootstrap JS documentation][jsdocs].

```js
//= require bootstrap/scrollspy
//= require bootstrap/modal
//= require bootstrap/dropdown
```

### Compass

#### New project

Install the gem and create a new project using the gem.

```console
gem install bootstrap-sass
compass create compass-project -r bootstrap-sass --using bootstrap
```

This will sort a few things out:

* You'll get a starting `styles.scss` ready for your alterations, along with a copy of the variables file for easy modification.
* You'll get a compiled stylesheet compiled & ready to drop into your application
* We'll also copy the Bootstrap javascripts & images into their respective folders for you

#### Existing project

Install the gem, add the require statement to the top of your configuration file, and install the extension.

```console
gem install bootstrap-sass
```

```ruby
# In config.rb
require 'bootstrap-sass'
```

```console
compass install bootstrap
```

### Sass

Raw Sass support is coming soon!

## Development

If you'd like to help with the development of bootstrap-sass itself, read this section.

### Upstream Converter

Keeping bootstrap-sass in sync with upstream changes from Bootstrap used to be an error prone and time consuming manual process.
With Bootstrap 3 we have introduced a converter that automates this.

Upstream changes to the Bootstrap project can now be pulled in using the `convert` rake task.

Here's an example run that would pull down the `3.0.0-wip` branch from the main twbs/bootstrap repo (defaults to `master`):

    bundle exec rake convert[3.0.0-wip]

The latest converter script is located [here][converter] and does the following:

* Converts upstream bootstrap LESS files to its matching SCSS file.
* Copies all upstream JavaScript into `vendor/assets/javascripts/bootstrap`
* Generates a javascript manifest at `vendor/assets/javascripts/bootstrap.js`
* Copies all upstream font files into `vendor/assets/fonts/bootstrap`
* Sets `Bootstrap::BOOTSTRAP_SHA` in [version.rb][version] to the branch sha.

This converter fully converts original LESS to SCSS. Conversion is automatic but requires instructions for certain transformations (see converter output).
Please submit GitHub issues tagged with `conversion`.

## Credits

bootstrap-sass has a number of major contributors:

<!-- feel free to make these link wherever you wish -->
* [Thomas McDonald](https://twitter.com/thomasmcdonald_)
* Tristan Harward
* Peter Gumeson
* [Gleb Mazovetskiy](https://github.com/glebm)

and a [significant number of other contributors][contrib].

## You're in good company
bootstrap-sass is used to build some awesome projects all over the web, including
[Diaspora](http://diasporaproject.org/), [rails_admin](https://github.com/sferik/rails_admin),
Michael Hartl's [Rails Tutorial](http://railstutorial.org/), [gitlabhq](http://gitlabhq.com/) and
[kandan](http://kandanapp.com/).

[converter]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/tasks/converter.rb
[version]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/lib/bootstrap-sass/version.rb
[contrib]: https://github.com/thomas-mcdonald/bootstrap-sass/graphs/contributors
[antirequire]: https://github.com/thomas-mcdonald/bootstrap-sass/issues/79#issuecomment-4428595
[jsdocs]: http://getbootstrap.com/javascript/#transitions