module Bootstrap
  # Inspired by Kaminari
  def self.load!
    if compass? and rails?
      # Handle compass integration with Rails. Looks fun.
    elsif rails?
      require 'sass-rails' # See: https://github.com/thomas-mcdonald/bootstrap-sass/pull/4
      require 'bootstrap-sass/engine'
    elsif compass?
      require 'bootstrap-sass/compass_extensions'
      register_compass
    else
      # Raise error
    end
  end

  private
  def self.register_compass
    base = File.join(File.dirname(__FILE__), '..')
    styles = File.join(base, 'vendor', 'assets', 'stylesheets')
    templates = File.join(base, 'templates')
    ::Compass::Frameworks.register('bootstrap', :stylesheets_directory => styles, :templates_directory => templates)
  end

  def self.rails?
    defined?(::Rails)
  end

  def self.compass?
    defined?(::Compass)
  end
end

Bootstrap.load!