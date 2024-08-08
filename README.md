# Bootstrap 3 for Sass

> __Deprecation notice:__ <a href="https://github.com/talis/bootstrap-sass">Bootstrap-Sass</a> is now deprecated. No new functionality will be added. Use <a href="https://getbootstrap.com/docs/">Bootstrap v5</a> and <a href="https://github.com/talis/bootstrap-theme">our theme</a> for new projects.

`bootstrap-sass` is a Sass-powered version of [Bootstrap](https://github.com/twbs/bootstrap) 3, ready to drop right into your Sass powered applications.


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

Precision is set for Ruby automatically when using the `sassc-rails` gem.
When using the npm or Bower version with Ruby, you can set it with:

```ruby
::Sass::Script::Value::Number.precision = [8, ::Sass::Script::Value::Number.precision].max
```

### Sass: Autoprefixer

Bootstrap requires the use of [Autoprefixer][autoprefixer].
[Autoprefixer][autoprefixer] adds vendor prefixes to CSS rules using values from [Can I Use](https://caniuse.com/).

To match [upstream Bootstrap's level of browser compatibility](https://getbootstrap.com/getting-started/#support), set Autoprefixer's `browsers` option to:
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

The full list of Bootstrap variables can be found [here](https://getbootstrap.com/customize/#less-variables). You can override these by simply redefining the variable before the `@import` directive, e.g.:

```scss
$navbar-default-bg: #312312;
$light-orange: #ff8c00;
$navbar-default-color: $light-orange;

@import "bootstrap";
```

## Local Dev

Run `npm run start` and this will bring up a local server with the docs that will recompile changes.
