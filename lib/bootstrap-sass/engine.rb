module Bootstrap
  module Rails
    class Engine < ::Rails::Engine
      initializer "bootstrap-sass.assets.precompile" do |app|
        app.config.assets.precompile += %w(glyphicons-halflings.png glyphicons-halflings-white.png)
      end
    end
  end
end
