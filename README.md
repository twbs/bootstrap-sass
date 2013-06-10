# Bootstrap for Sass

[![Build Status](https://secure.travis-ci.org/thomas-mcdonald/bootstrap-sass.png?branch=master)](http://travis-ci.org/thomas-mcdonald/bootstrap-sass)

`bootstrap-sass` is an Sass-powered version of [Twitter's Bootstrap](http://github.com/twitter/bootstrap), ready to drop right into your Sass powered applications.

Enjoy.

## Usage

### Rails

In your Gemfile:

```ruby
gem 'sass-rails', '~> 3.2'
gem 'bootstrap-sass', '~> 2.3.2'
```

`bundle install` and restart your server to make the files available.

#### Rails 4

Due to a change in Rails that prevents images from being compiled in vendor and lib, you'll need to add the following line to your application.rb:

    config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)

#### CSS

Import Bootstrap in an SCSS file (for example, `application.css.scss`) to get all of Bootstrap's styles, mixins and variables! We recommend against using `//= require` directives, since none of your other stylesheets will be [able to use](https://github.com/thomas-mcdonald/bootstrap-sass/issues/79#issuecomment-4428595) the awesome mixins that Bootstrap has defined.

```css
@import "bootstrap";
```

#### Javascripts

You can include the Bootstrap javascripts through two methods. In this case, Sprocket's `//= require` directives are useful, since there is no better alternative.

We have a helper that includes all available javascripts:

```js
// Loads all Bootstrap javascripts
//= require bootstrap
```

You can also load individual modules, provided you sort out any related dependencies.

```js
//= require bootstrap-scrollspy
//= require bootstrap-modal
//= require bootstrap-dropdown
```

Simples.

### Compass

`bootstrap-sass` 2.0 now comes with support for Compass, meaning projects that don't use Rails can get in on the fun Bootstrap web.

#### New project

Install the gem and create a new project using the gem.

```console
gem install bootstrap-sass
compass create compass-test -r bootstrap-sass --using bootstrap
```

This will sort a few things out:

* You'll get a starting `styles.scss` ready for your alterations
* You'll get a compiled stylesheet compiled & ready to drop into your application
* We'll also copy the Bootstrap javascripts & images into their respective folders for you, absolutely free of charge! How cool is that?

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

You'll get the same benefits as those starting from scratch. Radical.

## Configuration
Need to configure a variable or two? Simply define the value of the variable you want to change *before* importing Bootstrap. Sass will respect your existing definition rather than overwriting it with the Bootstrap defaults. A list of customisable variables can be found in the [Bootstrap documentation](http://twitter.github.com/bootstrap/customize.html#variables).

```scss
$btnPrimaryBackground: #f00;
@import "bootstrap";
```

**Note**: It's important that the file you are importing is not named `bootstrap`, since this will cause an import loop. As a general rule, errors are something you should try to avoid.

### Passing multiple values to mixins

Some CSS3 properties take multiple values, such as `box-shadow` or `text-shadow`. To pass multiple values to the Bootstrap mixins, you must escape the values or else the Sass parser will choke on the commas. Here's how to escape the values in Sass:

```scss
.selector {
  @include box-shadow(#{0 2px 5px rgba(0,0,0,.25) inset, 0 -2px 5px rgba(0,0,0,.25) inset});
}
```

### Responsive styling?
As per the Bootstrap project we don't include the responsive styles by default. `@import "bootstrap-responsive";` to get them.

## Versioning
Bootstrap [claims](https://github.com/twitter/bootstrap#versioning) to use SemVer, although this is for values of public API that don't seem to include selectively requiring CSS components (see breaking change 2.0.2 -> 2.0.3). Since many people using bootstrap-sass *do* selectively require CSS components and I consider it part of the public API we can't really follow SemVer without becoming wildly out of sync with the Bootstrap version number, which is confusing for everyone involved. Further releases to bootstrap-sass will therefore have version numbers of the form `2.x.y.z`, where `2.x.y` is the release of Bootstrap we should be compatible with, and `z` is the patch version.

Basically this means you should expect to append a separate patch version to the bootstrap version, which allows our versioning to stay more honest about changes.

### Bundler?

```ruby
gem 'bootstrap-sass', '~> 2.3.2'
```

Don't use the standard `~> 2.x.y`. Your apps may break.

## Who
bootstrap-sass is a project by [Thomas McDonald](https://twitter.com/#!/thomasmcdonald_), with support from [other awesome people](https://github.com/thomas-mcdonald/bootstrap-sass/graphs/contributors).

## You're in good company
bootstrap-sass is used to build some awesome projects, including [Diaspora](http://diasporaproject.org/), [rails_admin](https://github.com/sferik/rails_admin), Michael Hartl's [Rails Tutorial](http://railstutorial.org/), [gitlabhq](http://gitlabhq.com/) and [kandan](http://kandanapp.com/). Using bootstrap-sass? I'd love it if you let me know.
