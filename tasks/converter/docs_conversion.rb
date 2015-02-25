class Converter
  module DocsConversion
    def process_docs
      log_status 'Processing docs...'
      save_to = @save_to[:docs]
      read_files('docs', bootstrap_doc_files).each do |name, content|
        if name =~ /\.html/
          log_processing name
          content = content.gsub(/\{% highlight (?:scss|less) %\}(.*?)\{% endhighlight %\}/m) {
            "{% highlight scss %}#{convert_less $1}{% endhighlight %}"
          }
          log_processed name
        end
        save_file "#{save_to}/#{name}", content
      end
    end

    def bootstrap_doc_files
      @bootstrap_doc_files ||= get_file_paths('docs') - ['_plugins/bridge.rb']
    end
  end
end