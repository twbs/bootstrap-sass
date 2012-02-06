module Bootstrap
  class FrameworkNotFound < StandardError; end

  # Inspired by Kaminari
  def self.load!
    if rails?
      require 'sass-rails' # See: https://github.com/thomas-mcdonald/bootstrap-sass/pull/4
      require 'bootstrap-sass/engine'
    elsif compass?
      require 'bootstrap-sass/compass_extensions'
      base = File.join(File.dirname(__FILE__), '..')
      styles = File.join(base, 'vendor', 'assets', 'stylesheets')
      templates = File.join(base, 'templates')
      ::Compass::Frameworks.register('bootstrap', :stylesheets_directory => styles, :templates_directory => templates)
    else
      raise Bootstrap::FrameworkNotFound, "bootstrap-sass requires either Rails or Compass, neither of which are loaded"
    end
  end

  private
  def self.rails?
    defined?(::Rails)
  end

  def self.compass?
    defined?(::Compass)
  end
end

Bootstrap.load!
