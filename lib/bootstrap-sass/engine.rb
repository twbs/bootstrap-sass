require File.dirname(__FILE__) + '/helpers/modal_helper.rb'
require File.dirname(__FILE__) + '/helpers/flash_block_helper.rb'

module Bootstrap
  module Rails
    class Engine < ::Rails::Engine
      # Rails, will you please look in our vendor? kthx

      initializer 'bootstrap-sass.initialize_helpers' do |app|
        app.config.to_prepare do
          ActionController::Base.send :helper, ModalHelper
          ActionController::Base.send :helper, FlashBlockHelper
        end
      end

    end
  end
end
