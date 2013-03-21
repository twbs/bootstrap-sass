# Conditional check if the gem is used without Rails
if defined?(::Rails)
  module Bootstrap
    module Rails
      class Engine < ::Rails::Engine
        # Rails, will you please look in our vendor? kthx
      end
    end
  end
end