# tatami
[![npm version](https://img.shields.io/npm/v/@notainc/tatami.svg?style=flat)](https://www.npmjs.com/package/bootstrap-sass)
[![Build Status](https://img.shields.io/travis/twbs/bootstrap-sass.svg)](https://travis-ci.org/twbs/bootstrap-sass)

Tatami is Nota's fork of Bootstrap 3. Specialized modern web app UI. Support touch and mouse inputs. https://nota-tatami.herokuapp.com/

## Installation

```console
$ npm install @notainc/tatami
```

## Configuration

### Sass

By default all of Bootstrap is imported.

You can also import components explicitly. To start with a full list of modules copy
[`_bootstrap.scss`](assets/stylesheets/_bootstrap.scss) file into your assets as `_bootstrap-custom.scss`.
Then comment out components you do not want from `_bootstrap-custom`.
In the application Sass file, replace `@import 'bootstrap'` with:

```scss
@import 'bootstrap-custom';
```

### Sass: Number Precision

bootstrap-sass [requires](https://github.com/twbs/bootstrap-sass/issues/409) minimum [Sass number precision][sass-precision] of 8 (default is 5).

Precision is set for Rails and Compass automatically.
When using Ruby Sass compiler standalone or with the Bower version you can set it with:

```ruby
::Sass::Script::Value::Number.precision = [8, ::Sass::Script::Value::Number.precision].max
```

### Sass: Autoprefixer

Bootstrap requires the use of [Autoprefixer][autoprefixer].
[Autoprefixer][autoprefixer] adds vendor prefixes to CSS rules using values from [Can I Use](http://caniuse.com/).

To match [upstream Bootstrap's level of browser compatibility](http://getbootstrap.com/getting-started/#support), set Autoprefixer's `browsers` option to:
```json
[
  "Android 2.3",
  "Android >= 4",
  "Chrome >= 20",
  "Firefox >= 24",
  "Explorer >= 8",
  "iOS >= 6",
  "Opera >= 12",
  "Safari >= 6"
]
```

### JavaScript

[`assets/javascripts/bootstrap.js`](/assets/javascripts/bootstrap.js) contains all of Bootstrap's JavaScript,
concatenated in the [correct order](/assets/javascripts/bootstrap-sprockets.js).


#### JavaScript with Sprockets or Mincer

If you use Sprockets or Mincer, you can require `bootstrap-sprockets` instead to load the individual modules:

```js
// Load all Bootstrap JavaScript
//= require bootstrap-sprockets
```

You can also load individual modules, provided you also require any dependencies.
You can check dependencies in the [Bootstrap JS documentation][jsdocs].

```js
//= require bootstrap/scrollspy
//= require bootstrap/modal
//= require bootstrap/dropdown
```

### Fonts

The fonts are referenced as:

```scss
"#{$icon-font-path}#{$icon-font-name}.eot"
```

`$icon-font-path` defaults to `bootstrap/` if asset path helpers are used, and `../fonts/bootstrap/` otherwise.

When using bootstrap-sass with Compass, Sprockets, or Mincer, you **must** import the relevant path helpers before Bootstrap itself, for example:

```scss
@import "bootstrap-compass";
@import "bootstrap";
```

## Usage

### Sass

Import Bootstrap into a Sass file (for example, `application.scss`) to get all of Bootstrap's styles, mixins and variables!

```scss
@import "bootstrap";
```

You can also include optional Bootstrap theme:

```scss
@import "bootstrap/theme";
```

The full list of Bootstrap variables can be found [here](http://getbootstrap.com/customize/#less-variables). You can override these by simply redefining the variable before the `@import` directive, e.g.:

```scss
$navbar-default-bg: #312312;
$light-orange: #ff8c00;
$navbar-default-color: $light-orange;

@import "bootstrap";
```

### Eyeglass

Bootstrap is available as an [Eyeglass](https://github.com/sass-eyeglass/eyeglass) module. After installing Bootstrap via NPM you can import the Bootstrap library via:

```scss
@import "tatami/bootstrap"
```

or import only the parts of Bootstrap you need:

```scss
@import "tatami/bootstrap/variables";
@import "tatami/bootstrap/mixins";
@import "tatami/bootstrap/carousel";
```
