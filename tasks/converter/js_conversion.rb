class Converter
  module JsConversion
    def process_javascript_assets
      log_status 'Processing javascripts...'
      save_to = @save_to[:js]
      read_files('js', bootstrap_js_files).each do |name, file|
        save_file("#{save_to}/#{name}", file)
      end
      log_processed "#{bootstrap_js_files * ' '}"

      log_status 'Updating javascript manifest'
      content = ''
      bootstrap_js_files.each do |name|
        name = name.gsub(/\.js$/, '')
        content << "//= require bootstrap/#{name}\n"
      end
      path = 'vendor/assets/javascripts/bootstrap.js'
      save_file(path, content)
      log_processed path
    end

    def bootstrap_js_files
      @bootstrap_js_files ||= begin
        files = get_paths_by_type 'js', /\.js$/
        files.sort_by { |f|
          case f
            # tooltip depends on popover and must be loaded earlier
            when /tooltip/ then
              1
            when /popover/ then
              2
            else
              0
          end
        }
      end
    end
  end
end
