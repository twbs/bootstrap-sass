class Converter
  class Logger
    include Term::ANSIColor

    def initialize(env)
      @env = env
      puts bold "Convert Bootstrap LESS to SASS"
      puts " repo   : #{env[:repo]}"
      puts " branch : #{env[:branch]} #{dark "#{env[:repo]}/tree/#{env[:branch_sha]}"}"
      puts " save to: #{@env[:save_at].to_json}"
      puts " twbs cache: #{@env[:cache_path]}"
      puts dark "-" * 60
    end

    def log_status(status)
      puts bold status
    end

    def log_file_info(s)
      puts "    #{magenta s}"
    end

    def log_transform(*args)
      puts "#{cyan "    #{caller[1][/`.*'/][1..-2].sub(/^block in /, '')}"}#{cyan ": #{args * ', '}" unless args.empty?}"
    end

    def log_processing(name)
      puts yellow "  #{File.basename(name)}"
    end

    def log_processed(name)
      puts green "    #{name}"
    end

    def log_http_get_file(url, cached = false)
      s = "  #{'CACHED ' if cached}GET #{url}..."
      if cached
        puts dark green s
      else
        puts dark cyan s
      end
    end

    def log_http_get_files(files, from, cached = false)
      s = "  #{'CACHED ' if cached}GET #{files.length} files from #{from} #{files * ' '}..."
      if cached
        puts dark green s
      else
        puts dark cyan s
      end
    end

    def puts(*args)
      STDOUT.puts *args unless @silence
    end

    def silence_log
      @silence = true
      yield
    ensure
      @silence = false
    end
  end
end