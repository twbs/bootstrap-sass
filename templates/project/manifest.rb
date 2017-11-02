description 'Bootstrap for Sass'

# Stylesheet importing bootstrap
stylesheet 'styles.sass'

# Bootstrap variable overrides file
stylesheet '_bootstrap-variables.sass', :to => '_bootstrap-variables.sass'

# Copy JS and fonts
manifest = Pathname.new(File.dirname(__FILE__))
assets   = File.expand_path('../../assets', manifest)
{:javascript => 'javascripts',
 :font       => 'fonts'
}.each do |method, dir|
  root = Pathname.new(assets).join(dir)
  Dir.glob root.join('**', '*.*') do |path|
    path = Pathname.new(path)
    send method, path.relative_path_from(manifest).to_s, :to => path.relative_path_from(root).to_s
  end
end
