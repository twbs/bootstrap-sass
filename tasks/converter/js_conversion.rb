class Converter
  module JsConversion
    def process_javascript_assets
      log_status 'Processing javascripts...'
      save_at = @save_at[:js]
      read_files('js', bootstrap_js_files).each do |name, file|
        save_file("#{save_at}/#{name}", file)
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
  end
end