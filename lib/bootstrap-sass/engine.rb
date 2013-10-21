module Bootstrap
  module Rails
    class Engine < ::Rails::Engine
      initializer "bootstrap-sass.assets.precompile" do |app|
        app.config.assets.precompile << %r(bootstrap/glyphicons-halflings-regular\.(?:eot|svg|ttf|woff)$)
      end
    end
  end
end
