module Bootstrap
  # Inspired by Kaminari
  def self.load!
    if rails?
      require 'sass-rails' # See: https://github.com/thomas-mcdonald/bootstrap-sass/pull/4
      require 'bootstrap-sass/engine'
    elsif compass?
      # TODO: Handle compass - detect presence and hook in.
    else
      # Raise error
    end
  end

  private
  def self.rails?
    defined?(::Rails)
  end

  def self.compass?
    false
  end
end

Bootstrap.load!