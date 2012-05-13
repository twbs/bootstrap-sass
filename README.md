# Bootstrap for Sass

[![Build Status](https://secure.travis-ci.org/thomas-mcdonald/bootstrap-sass.png?branch=master)](http://travis-ci.org/thomas-mcdonald/bootstrap-sass)

`bootstrap-sass` is an Sass-powered version of [Twitter's Bootstrap](http://github.com/twitter/bootstrap), ready to drop right into your Sass powered applications.

Enjoy.

## Updating
Updating your application to a new version of `bootstrap-sass`? See our [changelog](https://github.com/thomas-mcdonald/bootstrap-sass/blob/master/CHANGELOG.md), [Bootstrap's changelog](https://github.com/twitter/bootstrap/wiki/Changelog), and this [guide to updating to Bootstrap 2.0](http://twitter.github.com/bootstrap/upgrading.html)

## Usage

### Rails

In your Gemfile:

    gem 'sass-rails', '~> 3.1'
    gem 'bootstrap-sass', '~> 2.0.3'

#### CSS

Import "bootstrap" in your SCSS file of choice to get all of Bootstrap's styles, mixins and variables! We recommend against using `//= require` directives, since none of your other stylesheets will be [able to use](https://github.com/thomas-mcdonald/bootstrap-sass/issues/79#issuecomment-4428595) the awesome mixins that Bootstrap has defined.

    @import "bootstrap";

#### Javascripts

You can include the Bootstrap javascripts through two methods. In this case, Sprocket's `//= require` directives are useful, since there is no better alternative.

We have a helper that includes all available javascripts:

    // Loads all Bootstrap javascripts
    //= require bootstrap

You can also load individual modules, provided you sort out any related dependencies.

    //= require bootstrap-scrollspy
    //= require bootstrap-modal
    //= require bootstrap-dropdown

Simples.

### Compass

`bootstrap-sass` 2.0 now comes with support for Compass, meaning projects that don't use Rails can get in on the fun Bootstrap web.

#### New project

Install the gem and create a new project using the gem.

    gem install bootstrap-sass
    compass create compass-test -r bootstrap-sass --using bootstrap

This will sort a few things out:

* You'll get a starting `styles.scss` ready for your alterations
* You'll get a compiled stylesheet compiled & ready to drop into your application
* We'll also copy the Bootstrap javascripts & images into their respective folders for you, absolutely free of charge! How cool is that?

#### Existing project

Install the gem, add the require statement to the top of your configuration file, and install the extension.

    gem install bootstrap-sass

    # In config.rb
    require 'bootstrap-sass'

    compass install bootstrap

You'll get the same benefits as those starting from scratch. Radical.

## Configuration
Need to configure a variable or two? Simply define the value of the variable you want to change *before* importing Bootstrap. Sass will respect your existing definition rather than overwriting it with the Bootstrap defaults. A list of customisable variables can be found in the [Bootstrap documentation](http://twitter.github.com/bootstrap/less.html#variables).

    $btnPrimaryBackground: #f00;
    @import "bootstrap";

**Note**: It's important that the file you are importing is not named `bootstrap`, since this will cause an import loop. As a general rule, errors are something you should try to avoid.

### Passing multiple values to mixins

Some CSS3 properties take multiple values, such as `box-shadow` or `text-shadow`. To pass multiple values to the Bootstrap mixins, you must escape the values or else the Sass parser will choke on the commas. Here's how to escape the values in Sass:

    .selector {
      @include box-shadow(#{0 2px 5px rgba(0,0,0,.25) inset, 0 -2px 5px rgba(0,0,0,.25) inset});
    }

### Responsive styling?
As per the Bootstrap project we don't include the responsive styles by default. `@import "bootstrap-responsive";` to get them.

## Who
bootstrap-sass is a project by [Thomas McDonald](https://twitter.com/#!/thomasmcdonald_), with support from [other awesome people](https://github.com/thomas-mcdonald/bootstrap-sass/graphs/contributors).

## You're in good company
bootstrap-sass is used to build some awesome projects, including [Diaspora](http://diasporaproject.org/), [rails_admin](https://github.com/sferik/rails_admin), Michael Hartl's [Rails Tutorial](http://railstutorial.org/) and [gitlabhq](http://gitlabhq.com/). Using bootstrap-sass? I'd love it if you let me know through Twitter.
