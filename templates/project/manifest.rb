description "Bootstrap for Sass"

# Stylesheet importing bootstrap
stylesheet 'styles.scss'

#
# Other Bootstrap assets
basedir = '../../vendor/assets'

# Glyphicons sprites
%w(glyphicons-halflings glyphicons-halflings-white).each do |file|
  image "#{basedir}/images/#{file}.png", :to => "#{file}.png"
end

# Javascripts
%w(alert button carousel collapse dropdown modal popover scrollspy tab tooltip transition typeahead).each do |file|
  javascript "#{basedir}/javascripts/bootstrap-#{file}.js", :to => "bootstrap-#{file}.js"
end