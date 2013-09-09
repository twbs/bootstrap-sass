# Bootstrap for Sass

[![Build Status](https://secure.travis-ci.org/thomas-mcdonald/bootstrap-sass.png?branch=master)](http://travis-ci.org/thomas-mcdonald/bootstrap-sass) [![Code Climate](https://codeclimate.com/github/thomas-mcdonald/bootstrap-sass.png)](https://codeclimate.com/github/thomas-mcdonald/bootstrap-sass)

`bootstrap-sass` is an Sass-powered version of [Bootstrap](http://github.com/twbs/bootstrap), ready to drop right into your Sass powered applications.

## Installation and Usage

Please see the appropriate guide for your environment of choice:

* [Rails][railsguide]
* [Compass][compassguide]
* ---[Sass][sassguide]--- (*supported soon*)

## Development

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

=======
[railsguide]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/docs/RAILS.md
[compassguide]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/docs/COMPASS.md
[sassguide]: #
[converter]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/tasks/converter.rb
[version]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/lib/bootstrap-sass/version.rb
[contrib]: https://github.com/thomas-mcdonald/bootstrap-sass/graphs/contributors
>>>>>>> 3
