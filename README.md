# Bootstrap for Sass [![Gem Version](https://badge.fury.io/rb/bootstrap-sass.svg)](http://badge.fury.io/rb/bootstrap-sass) [![Bower Version](https://badge.fury.io/bo/bootstrap-sass-official.svg)](http://badge.fury.io/bo/bootstrap-sass-official) [![Build Status](http://img.shields.io/travis/twbs/bootstrap-sass.svg)](http://travis-ci.org/twbs/bootstrap-sass)

`bootstrap-sass` is a Sass-powered version of [Bootstrap](http://github.com/twbs/bootstrap), ready to drop right into your Sass powered applications.

## Installation

Please see the appropriate guide for your environment of choice:

### a. Ruby on Rails

`bootstrap-sass` is easy to drop into Rails with the asset pipeline.

In your Gemfile you need to add the `bootstrap-sass` gem, and ensure that the `sass-rails` gem is present - it is added to new Rails applications by default.

```ruby
gem 'sass-rails', '>= 3.2'
gem 'bootstrap-sass', '~> 3.1.1'
```

`bundle install` and restart your server to make the files available through the pipeline.


#### Rails 3.2.x

Rails 3.2 is [no longer maintained for bugfixes](http://guides.rubyonrails.org/maintenance_policy.html), and you should upgrade as soon as possible.

If you must use it, make sure bootstrap-sass is moved out of the `:assets` group.
This is because, by default in Rails 3.2, assets group gems are not required in `production`.
However, for pre-compilation to succeed in production, `bootstrap-sass` gem must be required.

Starting with bootstrap-sass v3.1.1.1, due to the structural changes from upstream you will need these
backported asset pipeline gems on Rails 3.2. There is more on why this is necessary in
https://github.com/twbs/bootstrap-sass/issues/523 and https://github.com/twbs/bootstrap-sass/issues/578.

```ruby
gem 'sprockets-rails', '=2.0.0.backport1'
gem 'sprockets', '=2.2.2.backport2'
gem 'sass-rails', github: 'guilleiguaran/sass-rails', branch: 'backport'
```

### b. Compass without Rails

Install the gem
```sh
gem install bootstrap-sass
```

If you have an existing Compass project:

```ruby
# config.rb:
require 'bootstrap-sass'
```

```console
bundle exec compass install bootstrap
```

If you are creating a new Compass project, you can generate it with bootstrap-sass support:

```console
bundle exec compass create my-new-project -r bootstrap-sass --using bootstrap
```

or, alternatively, if you're not using a Gemfile for your dependencies:

```console
compass create my-new-project -r bootstrap-sass --using bootstrap
```

This will create a new Compass project with the following files in it:

* [_bootstrap-variables.scss](/templates/project/_bootstrap-variables.sass.erb) - all of bootstrap variables (override them here).
* [styles.scss](/templates/project/styles.sass) - main project SCSS file, import `variables` and `bootstrap`.

Some bootstrap-sass mixins may conflict with the Compass ones.
If this happens, change the import order so that Compass mixins are loaded later.

### c. Ruby without Compass / Rails

Require the gem, and load paths and Sass helpers will be configured automatically:

```ruby
require 'bootstrap-sass'
```

### d. Node.js / Bower

Using bootstrap-sass as a Bower package is still being tested. It is compatible with node-sass 0.8.3+. You can install it with:

```bash
bower install bootstrap-sass-official
```

`bootstrap-sass` is taken so make sure you use the command above.

Sass, JS, and all other assets are located at [vendor/assets](/vendor/assets).

By default, `bower.json` main field list only the main `bootstrap.scss` and all the static assets (fonts and JS).
This is compatible by default with asset managers such as [wiredep](https://github.com/taptapship/wiredep).

#### Mincer

If you use [mincer][mincer] with node-sass, import bootstrap into a `.css.ejs.scss` file  like so:

```scss
// Import mincer asset paths helper integration
@import "bootstrap-mincer";
@import "bootstrap";
```

See also this [example manifest.js](/test/dummy_node_mincer/manifest.js) for mincer.

#### Number precision

bootstrap-sass [requires](https://github.com/twbs/bootstrap-sass/issues/409) minimum [Sass number precision][sass-precision] of 10 (default is 5).

When using ruby Sass compiler with the bower version you can enforce the limit with:

```ruby
::Sass::Script::Number.precision = [10, ::Sass::Script::Number.precision].max
```

Precision option is now available in libsass, but it has not made into node-sass yet.

#### JS and fonts

Assets are discovered automatically on Rails, Sprockets, Compass, and Node + Mincer, using native asset path helpers.

Otherwise the fonts are referenced as:

```sass
"#{$icon-font-path}#{$icon-font-name}.eot"
```

`$icon-font-path` defaults to `bootstrap/`.

When not using an asset pipeline, you can copy fonts and JS from bootstrap-sass, they are located at [vendor/assets](/vendor/assets):

```bash
mkdir public/fonts
cp -r $(bundle show bootstrap-sass)/vendor/assets/fonts/ public/fonts/
mkdir public/javascripts
cp -r $(bundle show bootstrap-sass)/vendor/assets/javascripts/ public/javascripts/
```

## Usage

### Sass

Import Bootstrap into a Sass file (for example, `application.css.scss`) to get all of Bootstrap's styles, mixins and variables!
We recommend against using `//= require` directives, since none of your other stylesheets will be [able to access][antirequire] the Bootstrap mixins or variables.

```scss
@import "bootstrap";
```

You can also include optional bootstrap theme:

```scss
@import "bootstrap/theme";
```

The full list of bootstrap variables can be found [here](http://getbootstrap.com/customize/#less-variables). You can override these by simply redefining the variable before the `@import` directive, e.g.:

```scss
$navbar-default-bg: #312312;
$light-orange: #ff8c00;
$navbar-default-color: $light-orange;

@import "bootstrap";
```

You can also import components explicitly. To start with a full list of modules copy this file from the gem:

```bash
cp $(bundle show bootstrap-sass)/vendor/assets/stylesheets/bootstrap.scss \
 app/assets/stylesheets/bootstrap-custom.scss
```
Comment out components you do not want from `bootstrap-custom`.

In `application.sass`, replace `@import 'bootstrap'` with:

```scss
  @import 'bootstrap-custom';
```

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

---

## Development and Contributing

If you'd like to help with the development of bootstrap-sass itself, read this section.

### Upstream Converter

Keeping bootstrap-sass in sync with upstream changes from Bootstrap used to be an error prone and time consuming manual process. With Bootstrap 3 we have introduced a converter that automates this.

**Note: if you're just looking to *use* Bootstrap 3, see the [installation](#installation) section above.**

Upstream changes to the Bootstrap project can now be pulled in using the `convert` rake task.

Here's an example run that would pull down the master branch from the main [twbs/bootstrap](https://github.com/twbs/bootstrap) repo:

    rake convert

This will convert the latest LESS to Sass and update to the latest JS.
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

[converter]: https://github.com/twbs/bootstrap-sass/blob/master/tasks/converter/less_conversion.rb
[version]: https://github.com/twbs/bootstrap-sass/blob/master/lib/bootstrap-sass/version.rb
[contrib]: https://github.com/twbs/bootstrap-sass/graphs/contributors
[antirequire]: https://github.com/twbs/bootstrap-sass/issues/79#issuecomment-4428595
[jsdocs]: http://getbootstrap.com/javascript/#transitions
[sass-precision]: http://sass-lang.com/documentation/Sass/Script/Number.html#precision-class_method
[mincer]: https://github.com/nodeca/mincer
