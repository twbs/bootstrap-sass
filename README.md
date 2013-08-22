# Bootstrap for Sass

`bootstrap-sass` is an Sass-powered version of [Bootstrap][bootstrap], ready to drop right into your Sass powered applications.

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

    % bundle exec rake 'convert[3.0.0-wip]'

The latest converter script is located [here][converter] and does the following:

* Converts upstream bootstrap LESS files to its matching SCSS file.
* Copies all upstream JavaScript into `vendor/assets/javascripts/bootstrap`
* Generates a javascript manifest at `vendor/assets/javascripts/bootstrap.js`
* Copies all upstream font files into `vendor/assets/fonts/bootstrap`
* Sets `Bootstrap::BOOTSTRAP_SHA` in [version.rb][version] to the branch sha.

This converter fully converts original LESS to SCSS. Conversion is automatic but requires instructions for certain transformations (see converter output for details).
Please submit GitHub issues tagged with `conversion`.

## Credits

bootstrap-sass has a number of major contributors:

<!-- feel free to make these link wherever you wish -->
* [Thomas McDonald][tm]
* Tristan Harward
* Peter Gumeson
* [Gleb Mazovetskiy][glebm]

and a [significant number of other contributors][contrib].

[bootstrap]: https://github.com/twbs/bootstrap
[railsguide]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/docs/RAILS.md
[compassguide]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/docs/COMPASS.md
[sassguide]: #
[converter]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/tasks/converter.rb
[tm]: https://twitter.com/thomasmcdonald_
[glebm]: https://github.com/glebm
[version]: https://github.com/thomas-mcdonald/bootstrap-sass/blob/3/lib/bootstrap-sass/version.rb
[contrib]: https://github.com/thomas-mcdonald/bootstrap-sass/graphs/contributors
