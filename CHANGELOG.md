# Changelog

## 2.1.0.0
* Updated to Bootstrap 2.1
* Changed some mixin names to be more consistent. Nested mixins in Less are separated by a `-` when they are flattened in Sass.

## 2.0.4.1
* Fix `.row-fluid > spanX` nesting
* Small Javascript fixes for those staying on the 2.0.4 release
* Add `!default` to z-index variables.

## 2.0.4.0
* Updated to Bootstrap 2.0.4
* Switched to Bootstrap 2.0.3+'s method of separating responsive files
* [#149, #150] Fix off by one error introduced with manual revert of media query breakpoints
* `rake debug` and `rake test` both compile bootstrap & bootstrap-responsive

## 2.0.3.1
* [#145, #146] Fix button alignment in collapsing navbar as a result of an incorrect variable

## 2.0.3
* Updated to Bootstrap 2.0.3
* [#106] Support for Rails < 3.1 through Compass
* [#132] Add CI testing
* [#106] Support Rails w/Compass
* [#134] Fix support for Rails w/Compass

## 2.0.2
* [#86] Updated to Bootstrap 2.0.2
Things of note: static navbars now have full width. (to be fixed in 2.0.3) `.navbar-inner > .container { width:940px; }` seems to work in the meanwhile
* [#62] Fixed asset compilation taking a *very* long time.
* [#69, #79, #80] \(Hopefully) clarified README. Now with less cat humour.
* [#91] Removed doubled up Sass extensions for Rails.
* [#63, #73] Allow for overriding of image-path
* [[SO](http://stackoverflow.com/a/9909626/241212)] Added makeFluidColumn mixin for defining fluid columns. Fluid rows must use `@extend .row-fluid`, and any column inside it can use `@include makeFluidColumn(num)`, where `num` is the number of columns. Unfortunately, there is a rather major limitation to this: margins on first-child elements must be overriden. See the attached Stack Overflow answer for more information.

## 2.0.1
* Updated to Bootstrap 2.0.1
* Modified `@mixin opacity()` to take an argument `0...1` rather than `0...100` to be consistent with Compass.

## 2.0.0
* Updated to Bootstrap 2.0.0