description 'Bootstrap for Sass'

# Stylesheet importing bootstrap
stylesheet 'styles.scss'

# SCSS:

assets = "../../vendor/assets"

bs_stylesheets = "#{assets}/stylesheets/bootstrap"
stylesheet '_variables.scss.erb', :to => '_variables.scss', :erb => true,
           :bs_variables_path => File.expand_path("#{bs_stylesheets}/_variables.scss", File.dirname(__FILE__))

# JS:
bs_javascripts = "#{assets}/javascripts/bootstrap"
Dir.glob File.expand_path("#{bs_javascripts}/*.js", File.dirname(__FILE__)) do |path|
  file = File.basename(path)
  javascript "#{bs_javascripts}/#{file}", :to => "bootstrap/#{file}"
end

bs_fonts = "#{assets}/fonts/bootstrap"
Dir.glob File.expand_path("#{bs_fonts}/*", File.dirname(__FILE__)) do |path|
  file = File.basename(path)
  font "#{bs_fonts}/#{file}", :to => "bootstrap/#{file}"
end
