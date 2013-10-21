# bootstrap-sass with Compass

## New project

Install the gem and create a new project using the gem.

```console
gem install bootstrap-sass
compass create compass-project -r bootstrap-sass --using bootstrap
```

This will sort a few things out:

* You'll get a starting `styles.scss` ready for your alterations, along with a copy of the variables file for easy modification.
* You'll get a compiled stylesheet compiled & ready to drop into your application
* We'll also copy the Bootstrap javascripts & images into their respective folders for you

## Existing project

Install the gem, add the require statement to the top of your configuration file, and install the extension.

```console
gem install bootstrap-sass
```

```ruby
# In config.rb
require 'bootstrap-sass'
```

```console
compass install bootstrap
```