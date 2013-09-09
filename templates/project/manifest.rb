description "Bootstrap for Sass"

# Stylesheet importing bootstrap
stylesheet 'styles.scss'
stylesheet '_variables.scss'

#
# Other Bootstrap assets
basedir = '../../vendor/assets'

%w(affix alert button carousel collapse dropdown modal popover scrollspy tab tooltip transition).each do |file|
  javascript "#{basedir}/javascripts/bootstrap/#{file}.js", :to => "bootstrap/#{file}.js"
end