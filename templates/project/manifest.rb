description 'Bootstrap for Sass'

# Stylesheet importing bootstrap
stylesheet 'styles.scss'

# SCSS:
stylesheet '_variables.scss.erb', to: '_variables.scss', erb: true

# JS:
bs_javascripts = "../../vendor/assets/javascripts/bootstrap"
%w(affix alert button carousel collapse dropdown modal popover scrollspy tab tooltip transition).each do |file|
  javascript "#{bs_javascripts}/#{file}.js", to: "bootstrap/#{file}.js"
end