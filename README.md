# Bootstrap for SASS

`bootstrap-sass` is an SASS-powered version of [Twitter's Bootstrap](http://github.com/twitter/bootstrap), ready to drop right into your SASS powered applications.

Enjoy.

## Usage

### Rails

In your Gemfile:

    gem 'sass-rails', '~> 3.1'
    gem 'bootstrap-sass', '~> 2.0.0'

**Note**: previous versions of bootstrap-sass automatically required sass-rails. This is no longer the case, and you will *need* to require it in your Gemfile.

#### CSS

Import "bootstrap" in your SCSS file of choice to get all of Bootstrap's styles, mixins and variables! Don't use Sproket's `//= require` directives for SASS files, because they're horrible and will kill your cat.

    @import "bootstrap";

Need to configure a variable or two? Simple define the value of the variable you want to change *before* importing Bootstrap. SASS will be awesome and respect your existing definition rather than overwriting it with the Bootstrap defaults. A list of customisable variables can be found in the [Bootstrap documentation](http://twitter.github.com/bootstrap/less.html#variables).

    $primaryButtonBackground: #f00;
    @import "bootstrap";

#### Javascripts

You can include the Bootstrap javascripts through two methods. In this case, Sproket's `//= require` directives are useful and will not cause feline death.

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

----

As per the Bootstrap project we don't include the responsive styles by default. `@import "bootstrap-responsive";` to get them.
