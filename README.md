# Bootstrap for Rails

`bootstrap-sass` is an SASS-powered version of [Twitter's Bootstrap](http://github.com/twitter/bootstrap), ready to drop right into your asset-pipeline powered Rails applications.

Enjoy.

## Usage

In your gemfile:

    gem 'bootstrap-sass', '1.2.0'

In your css file of choice:

    @import "bootstrap" // Use this to get all of Bootstrap's @mixins and $variables

or

    /*
     *= require bootstrap // This doesn't (at the moment) preserve loaded @mixins,
     *                    //so I wouldn't use this. Stil, its an alternative.
     */

Simples.

