module Bootstrap
  module Rails
    class Engine < ::Rails::Engine
      initializer 'bootstrap-sass.assets.precompile' do |app|
        %w(stylesheets javascripts fonts images).each do |sub|
          app.config.assets.paths << root.join('assets', sub).to_s
        end
        %w(stylesheets javascripts images fonts).each do |sub|
          app.config.assets.paths << root.join('lib','assets',sub).to_s
        end
        %w(stylesheets javascripts).each do |sub|
          app.config.assets.paths << root.join('vender','assets',sub).to_s
        end
        app.config.assets.precompile << %r(.+\.(?:png|jpg|jpeg|gif)$)
        app.config.assets.precompile << %r(bootstrap/glyphicons-halflings-regular\.(?:eot|svg|ttf|woff2?)$)
        app.config.assets.precompile << %r(verve/FontAwesome\.(?:otf?)$)
        app.config.assets.precompile << %r(verve/fontawesome-webfont\.(?:ttf|eot|svg|woff|woff2?)$)
      end
    end
  end
end
