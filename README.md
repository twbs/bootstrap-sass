# Bootstrap for SASS

`bootstrap-sass` is an SASS-powered version of [Twitter's Bootstrap](http://github.com/twitter/bootstrap), ready to drop right into your SASS powered applications.

Enjoy.

## Usage

### Including

#### Rails

In your gemfile:

    gem 'sass-rails', '~> 3.1'
    gem 'bootstrap-sass', '~> 2.0.0'

**Note**: previous versions of bootstrap-sass automatically required sass-rails. This is no longer the case.

#### Compass

Soon.

### CSS

In your SCSS file of choice:

    @import "bootstrap"; /* Use this to get all of Bootstrap's @mixins and $variables */

Want to configure a variable? Thanks to bernado, this is now awesome *and* easy! Just define the variables you want to change *before* importing Bootstrap. SASS will respect your existing definition and won't overwrite it with the Bootstrap defaults.

    $gridColumns: 12;
    $gridColumnWidth: 60px;
    $gridGutterWidth: 20px;
    @import "bootstrap";

### Javascripts

Running Rails? You can include the Bootstrap javascripts through two methods:

1. We have a helper that includes all available javascripts:

    // Loads all Bootstrap javascripts
    //= require bootstrap
    
2. You can also load individual modules, provided you include any related dependencies.
    
    // Alternatively, you can load individual modules
    //= require bootstrap-scrollspy
    //= require bootstrap-modal
    //= require bootstrap-dropdown

Simples.

## Versioning
We try to stick to Bootstrap versioning wherever possible. The major and minor version numbers will always represent the Twitter Bootstrap version, but no guarantees are made for the tiny version number, since waiting for Bootstrap to update so I can push out a fix sucks.

## Branches
Master will usually represent the latest release of `bootstrap-sass`. Other branches contain experimental code, or are a relatively close mirror of other Bootstrap branches.

