# Bootstrap for Rails

`bootstrap-sass` is an SASS-powered version of [Twitter's Bootstrap](http://github.com/twitter/bootstrap), ready to drop right into your asset-pipeline powered Rails applications.

Enjoy.

## Usage

In your gemfile:

    gem 'bootstrap-sass', '1.3.0'

### CSS

In your CSS file of choice:

    @import "bootstrap"; /* Use this to get all of Bootstrap's @mixins and $variables */

or

    /*
     *= require bootstrap // This doesn't (at the moment) preserve loaded @mixins,
     *                    //so I wouldn't use this. Stil, its an alternative.
     */

### Javascript

In your Javascript manifest:

    // Loads all Bootstrap javascripts
    //= require bootstrap
    
    // Alternatively
    //= require bootstrap-scrollspy
    //= require bootstrap-modal
    //= require bootstrap-dropdown

Simples.

