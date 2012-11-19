module BootstrapSass
  class LayoutGenerator < Rails::Generators::Base
    source_root File.expand_path('../templates', __FILE__)
    argument :layout_name, :type => :string, :default => "application"
    class_option :template, :type => :string, :default => "starter_template",
                 :desc => "[starter_template, fluid, hero]", :banner => "TEMPLATE_NAME"
    
    def generate_layout
      template "#{options.template}.html.erb", "app/views/layouts/#{file_name}.html.erb"
    end
    
  private
  
    def file_name
      layout_name.underscore
    end
  end
end
