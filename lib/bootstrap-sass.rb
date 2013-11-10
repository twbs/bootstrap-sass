module Bootstrap
  class FrameworkNotFound < StandardError; end

  class << self
    # Inspired by Kaminari
    def load!
      if compass?
        require 'bootstrap-sass/compass_functions'
        register_compass_extension
      elsif asset_pipeline?
        require 'bootstrap-sass/sass_functions'
      end

      if rails?
        require 'sass-rails'
        register_rails_engine
      end

      unless rails? || compass?
        raise Bootstrap::FrameworkNotFound,
              'bootstrap-sass requires either Rails > 3.1 or Compass, neither of which are loaded'
      end

      configure_sass
    end

    def gem_path
      @gem_path ||= File.expand_path '..', File.dirname(__FILE__)
    end

    def stylesheets_path
      @stylesheets_path ||= File.join gem_path, 'vendor', 'assets', 'stylesheets'
    end

    private

    def configure_sass
      ::Sass.load_paths << stylesheets_path

      # bootstrap requires minimum precision of 10, see https://github.com/thomas-mcdonald/bootstrap-sass/issues/409
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

    def asset_pipeline?
      defined?(::Sprockets)
    end

    def compass?
      defined?(::Compass)
    end

    def rails?
      defined?(::Rails)
    end
  end
end

Bootstrap.load!
