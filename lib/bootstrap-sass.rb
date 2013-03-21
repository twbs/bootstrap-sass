module Bootstrap
  class FrameworkNotFound < StandardError; end

  # Inspired by Kaminari
  def self.load!
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

    if !(rails? || compass?)
      raise Bootstrap::FrameworkNotFound, "bootstrap-sass requires either Rails > 3.1 or Compass, neither of which are loaded"
    end
    
    stylesheets = File.expand_path(File.join("..", 'vendor', 'assets', 'stylesheets'))
    ::Sass.load_paths << stylesheets
  end

  private
  def self.asset_pipeline?
    defined?(::Sprockets)
  end

  def self.compass?
    defined?(::Compass)
  end

  def self.rails?
    defined?(::Rails)
  end

  def self.register_compass_extension
    base = File.join(File.dirname(__FILE__), '..')
    styles = File.join(base, 'vendor', 'assets', 'stylesheets')
    templates = File.join(base, 'templates')
    ::Compass::Frameworks.register('bootstrap', :path => base, :stylesheets_directory => styles, :templates_directory => templates)
  end

  def self.register_rails_engine
    require 'bootstrap-sass/engine'
  end
end

Bootstrap.load!
