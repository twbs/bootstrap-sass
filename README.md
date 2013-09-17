# Bootstrap for Sass

[![Build Status](https://secure.travis-ci.org/thomas-mcdonald/bootstrap-sass.png?branch=master)](http://travis-ci.org/thomas-mcdonald/bootstrap-sass) [![Code Climate](https://codeclimate.com/github/thomas-mcdonald/bootstrap-sass.png)](https://codeclimate.com/github/thomas-mcdonald/bootstrap-sass)

`bootstrap-sass` is an Sass-powered version of [Bootstrap](http://github.com/twbs/bootstrap), ready to drop right into your Sass powered applications.

## Installation

Please see the appropriate guide for your environment of choice:

### a. Rails

`bootstrap-sass` is easy to drop into Rails with the asset pipeline.

In your Gemfile you need to add the `bootstrap-sass` gem, and ensure that the `sass-rails` gem is present - it is added to new Rails applications by default.

```ruby
gem 'sass-rails', '>= 3.2' # sass-rails needs to be higher than 3.2
gem 'bootstrap-sass', '~> 3.0.0.0.rc'
```

`bundle install` and restart your server to make the files available through the pipeline.

### b. Compass (no Rails)

Install the gem
```console
gem install bootstrap-sass --pre
```

If you have an existing Compass project:

```ruby
# config.rb:
require 'bootstrap-sass'
```

```console
compass install bootstrap
```

If you are creating a new Compass project, you can generate it with bootstrap-sass support:

```console
compass create my-new-project -r bootstrap-sass --using bootstrap
```

This will create a new Compass project with the following files in it:

* [_variables.scss](/templates/project/_variables.scss.erb) - all of bootstrap variables (override them here).
* [styles.scss](/templates/project/styles.scss) - main project SCSS file, import `variables` and `bootstrap`.


## Usage

### CSS / SCSS / SASS

Import Bootstrap in an SCSS file (for example, `application.css.scss`) to get all of Bootstrap's styles, mixins and variables! We recommend against using `//= require` directives, since none of your other stylesheets will be [able to access][antirequire] the Bootstrap mixins or variables.

```css
@import "bootstrap";
```

You can also include optional bootstrap theme:

```css
@import "bootstrap/theme";
```

The full list of bootstrap variables can be found [here](http://getbootstrap.com/customize/#less-variables). You can override these by simply redefining the variable before the `@import` directive.
For example:
```css
$navbar-default-bg: #312312;
$light-orange: #ff8c00;
$navbar-default-color: $light-orange;

@import "bootstrap";
```

For granular control over what is imported, instead of `@import "bootstrap"`, explicitly specify which modules and components should be included.

Copy `bootstrap.scss` from the gem into the project's vendor/ as `bootstrap-custom.scss`.

```bash
cp $(bundle show bootstrap-sass)/vendor/assets/stylesheets/bootstrap/bootstrap.scss \
   vendor/assets/stylesheets/bootstrap-custom.scss
```

Comment out the import statements you do not need from `bootstrap-custom.scss`.

Finally, in your `application.sass`:

```scss
  @import 'bootstrap-custom';
```

NB: This file now needs to be manually kept up to date with structural changes from upstream.

### Javascript

We have a helper that includes all Bootstrap javascripts. If you use Rails (or Sprockets separately), 
put this in your Javascript manifest (usually in `application.js`) to load the files in the [correct order](/vendor/assets/javascripts/bootstrap.js):

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

## Development and Contributing

If you'd like to help with the development of bootstrap-sass itself, read this section.

### Upstream Converter

Keeping bootstrap-sass in sync with upstream changes from Bootstrap used to be an error prone and time consuming manual process. With Bootstrap 3 we have introduced a converter that automates this.

**Note: if you're just looking to *use* Bootstrap 3, see the [installation](#installation) section above.**

Upstream changes to the Bootstrap project can now be pulled in using the `convert` rake task.

Here's an example run that would pull down the master branch from the main [twbs/bootstrap](https://github.com/twbs/bootstrap) repo:
    
    rake convert
    
This will convert the latest LESS to SASS and update to the latest JS.
To convert a specific branch or version, pass the branch name or the commit hash as the first task argument:
    
    rake convert[e8a1df5f060bf7e6631554648e0abde150aedbe4]

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
* [Tristan Harward](http://www.trisweb.com)
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
