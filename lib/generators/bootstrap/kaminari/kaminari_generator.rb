class Bootstrap::KaminariGenerator < Rails::Generators::Base
  source_root File.expand_path('../templates', __FILE__)

  def create_kaminari_files
    %w(first_page gap last_page next_page page paginator prev_page).each do |file|
      copy_file "_#{file}.html.erb", "app/views/kaminari/_#{file}.html.erb"
    end
  end
end
