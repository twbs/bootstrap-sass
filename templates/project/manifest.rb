description 'Bootstrap for Sass'

# Stylesheet importing bootstrap
stylesheet 'styles.scss'

# SCSS:
stylesheet '_variables.scss'

# JS:
bs_javascripts = "../../vendor/assets/javascripts/bootstrap"
Dir.glob File.expand_path("#{bs_javascripts}/*.js", File.dirname(__FILE__)) do |path|
  file = File.basename(path)
  javascript "#{bs_javascripts}/#{file}", to: "bootstrap/#{file}"
end
