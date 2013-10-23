description 'Bootstrap for Sass'

# Stylesheet importing bootstrap
stylesheet 'styles.scss'

# SCSS:
bs_stylesheets = "../../vendor/assets/stylesheets/bootstrap"
Dir.glob File.expand_path("#{bs_stylesheets}/_variables.scss", File.dirname(__FILE__)) do |path|
    file = File.basename(path)
    stylesheet "#{bs_stylesheets}/#{file}", to: "bootstrap/#{file}"
end

# JS:
bs_javascripts = "../../vendor/assets/javascripts/bootstrap"
Dir.glob File.expand_path("#{bs_javascripts}/*.js", File.dirname(__FILE__)) do |path|
  file = File.basename(path)
  javascript "#{bs_javascripts}/#{file}", to: "bootstrap/#{file}"
end
