class Converter
  module FontsConversion
    def process_font_assets
      log_status 'Processing fonts...'
      files   = read_files('fonts', bootstrap_font_files)
      save_at = @save_at[:fonts]
      files.each do |name, content|
        save_file "#{save_at}/#{name}", content
      end
    end
  end
end