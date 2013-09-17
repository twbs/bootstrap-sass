# bootstrap-sass with Rails

`bootstrap-sass` is easy to drop into Rails with the asset pipeline.

## Installation

In your Gemfile you need to add the `bootstrap-sass` gem, and ensure that the `sass-rails` gem is present - it is added to new Rails applications by default

```ruby
gem 'sass-rails', '>= 3.2' # sass-rails needs to be higher than 3.2
gem 'bootstrap-sass', '~> 2.3.2.1'
```

`bundle install` and restart your server to make the files available through the pipeline.

## Usage

### CSS

Import Bootstrap in an SCSS file (for example, `application.css.scss`) to get all of Bootstrap's styles, mixins and variables! We recommend against using `//= require` directives, since none of your other stylesheets will be [able to access][antirequire] the Bootstrap mixins or variables.

```css
@import "bootstrap";
```

You can also include optional bootstrap theme:

```css
@import "bootstrap/theme";
```
A full list of bootstrap variables can be found [here](http://getbootstrap.com/customize/#less-variables). You can override these by simply redefining the variable before the `@import` directive.
For example:
```css
$navbar-default-bg: #312312;
$light-orange: #ff8c00;
$navbar-default-color: $light-orange;

@import "bootstrap";
```

### Javascripts

We have a helper that includes all Bootstrap javascripts. Put this in your Javascript manifest (usually in `application.js`) to 

```js
// Loads all Bootstrap javascripts
//= require bootstrap
```

You can also load individual modules, provided you also require any dependencies. You can check dependencies in the [Bootstrap JS documentation][jsdocs].

```js
//= require bootstrap/scrollspy
//= require bootstrap/modal
//= require bootstrap/dropdown
```

[antirequire]: https://github.com/thomas-mcdonald/bootstrap-sass/issues/79#issuecomment-4428595
[jsdocs]: http://getbootstrap.com/javascript/#transitions
