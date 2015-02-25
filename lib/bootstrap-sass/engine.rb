module Bootstrap
  module Rails
    class Engine < ::Rails::Engine
      initializer 'bootstrap-sass.assets.precompile' do |app|
        %w(stylesheets javascripts fonts images).each do |sub|
          app.config.assets.paths << root.join('assets', sub).to_s
        end
        %w(stylesheets fonts javascripts).each do |sub|
          app.config.assets.paths << root.join('lib','assets',sub).to_s
        end
        app.config.assets.precompile << %r(bootstrap/glyphicons-halflings-regular\.(?:eot|svg|ttf|woff2?)$)
        app.config.assets.precompile << %r(verve/OpenSans(\-.+\.|\.)(?:ttf|eot|svg|woff2?)$)
      end
    end
  end
end
