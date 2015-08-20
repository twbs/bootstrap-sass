class Converter
  module ScssConversion
    def process_scss_assets
      log_status 'Processing scss...'
      save_to = @save_to[:scss]
      contents = {}
      read_files('scss', bootstrap_scss_files).each do |name, file|
        contents[name] = file
        save_file("#{save_to}/#{name}", file)
      end
      log_processed "#{bootstrap_scss_files * ' '}"

      log_status 'Updating scss main files'

      %w(bootstrap bootstrap-flex bootstrap-grid bootstrap-reboot).each do |file_name|
        main_from = "#{save_to}/#{file_name}.scss"
        main_to   = File.expand_path("#{save_to}/../_#{file_name}.scss")
        if file_name == 'bootstrap-flex'
          save_file main_to, File.read(main_from)
        else
          save_file main_to, File.read(main_from).gsub(/ "/, ' "bootstrap/')
        end
        File.delete(main_from)
      end

      log_status 'Generating variable template file'

      save_file 'templates/project/_bootstrap-variables.sass',
        "// Override Bootstrap variables here (defaults from bootstrap-sass v#{Bootstrap::VERSION}):\n\n" +
          File.read("#{save_to}/_variables.scss").lines[1..-1].join.gsub(/^(?=\$|\))/, '// ').gsub(/ !default/, '')

    end
  end

  def bootstrap_scss_files
    @bootstrap_scss_files ||= get_paths_by_type('scss', /\.scss$/)
  end
end
