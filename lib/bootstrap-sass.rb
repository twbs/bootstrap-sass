module Bootstrap
  class FrameworkNotFound < StandardError; end

  # Inspired by Kaminari
  def self.load!
    if compass? && asset_pipeline?
      register_compass_extension
      register_rails_engine
    elsif compass?
      # Only require compass extension if a standalone project
      require 'bootstrap-sass/compass_functions'
      register_compass_extension
    elsif asset_pipeline?
      require 'sass-rails' # See: https://github.com/thomas-mcdonald/bootstrap-sass/pull/4
      register_rails_engine
      require 'bootstrap-sass/rails_functions'
    else
      raise Bootstrap::FrameworkNotFound, "bootstrap-sass requires either Rails > 3.1 or Compass, neither of which are loaded"
    end
  end

  private
  def self.asset_pipeline?
    defined?(::Rails) && ::Rails.version >= '3.1.0'
  end

  def self.compass?
    defined?(::Compass)
  end

  def self.register_compass_extension
    base = File.join(File.dirname(__FILE__), '..')
    styles = File.join(base, 'vendor', 'assets', 'stylesheets')
    templates = File.join(base, 'templates')
    ::Compass::Frameworks.register('bootstrap', :stylesheets_directory => styles, :templates_directory => templates)
  end

  def self.register_rails_engine
    require 'bootstrap-sass/engine'
  end
end

Bootstrap.load!
