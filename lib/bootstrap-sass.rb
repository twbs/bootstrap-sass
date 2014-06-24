module Bootstrap
  class << self
    # Inspired by Kaminari
    def load!
      register_compass_extension if compass?

      if rails?
        register_rails_engine
      end

      configure_sass
    end

    # Paths
    def gem_path
      @gem_path ||= File.expand_path '..', File.dirname(__FILE__)
    end

    def stylesheets_path
      File.join assets_path, 'stylesheets'
    end

    def fonts_path
      File.join assets_path, 'fonts'
    end

    def javascripts_path
      File.join assets_path, 'javascripts'
    end

    def assets_path
      @assets_path ||= File.join gem_path, 'assets'
    end

    # Environment detection helpers
    def asset_pipeline?
      defined?(::Sprockets)
    end

    def compass?
      defined?(::Compass)
    end

    def rails?
      defined?(::Rails)
    end

    private

    def configure_sass
      require 'sass' unless defined?(::Sass)

      ::Sass.load_paths << stylesheets_path

      # bootstrap requires minimum precision of 10, see https://github.com/twbs/bootstrap-sass/issues/409
      ::Sass::Script::Number.precision = [10, ::Sass::Script::Number.precision].max
    end

    def register_compass_extension
      ::Compass::Frameworks.register(
          'bootstrap',
          :path                  => gem_path,
          :stylesheets_directory => stylesheets_path,
          :templates_directory   => File.join(gem_path, 'templates')
      )
    end

    def register_rails_engine
      require 'bootstrap-sass/engine'
    end
  end
end

Bootstrap.load!
