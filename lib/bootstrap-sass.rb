require 'bootstrap-sass/version'
module Bootstrap
  class << self
    # Inspired by Kaminari
    def load!
      register_compass_extension if compass?

      if rails?
        register_rails_engine
      elsif hanami?
        register_hanami
      elsif sprockets?
        register_sprockets
      elsif defined?(::Sass) && ::Sass.respond_to?(:load_paths)
        # The deprecated `sass` gem:
        ::Sass.load_paths << stylesheets_path
      end

      if defined?(::Sass::Script::Value::Number)
        # bootstrap requires minimum precision of 8, see https://github.com/twbs/bootstrap-sass/issues/409
        ::Sass::Script::Value::Number.precision = [8, ::Sass::Script::Value::Number.precision].max
      end
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
    def sprockets?
      defined?(::Sprockets)
    end

    def compass?
      defined?(::Compass::Frameworks)
    end

    def rails?
      defined?(::Rails)
    end

    def hanami?
      defined?(::Hanami)
    end

    private

    def register_compass_extension
      ::Compass::Frameworks.register(
          'bootstrap',
          :version               => Bootstrap::VERSION,
          :path                  => gem_path,
          :stylesheets_directory => stylesheets_path,
          :templates_directory   => File.join(gem_path, 'templates')
      )
    end

    def register_rails_engine
      require 'bootstrap-sass/engine'
    end

    def register_hanami
      Hanami::Assets.sources << assets_path
    end

    def register_sprockets
      Sprockets.append_path(stylesheets_path)
      Sprockets.append_path(fonts_path)
      Sprockets.append_path(javascripts_path)
    end
  end
end

Bootstrap.load!
