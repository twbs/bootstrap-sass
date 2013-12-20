class Converter
  module Network
    protected

    def get_paths_by_type(dir, file_re)
      files = get_json "https://api.github.com/repos/#@repo/git/trees/#{get_tree_sha(dir)}"
      files['tree'].select { |f| f['type'] == 'blob' && f['path'] =~ file_re }.map { |f| f['path'] }
    end

    def read_files(path, files)
      full_path = "https://raw.github.com/#@repo/#@branch_sha/#{path}"
      if (contents = read_cached_files(path, files))
        log_http_get_files files, full_path, true
      else
        log_http_get_files files, full_path, false
        contents = {}
        files.map do |name|
          Thread.start {
            content = open("#{full_path}/#{name}").read
            Thread.exclusive { contents[name] = content }
          }
        end.each(&:join)
        write_cached_files path, contents
      end
      contents
    end

    def read_cached_files(path, files)
      full_path = "#@cache_path/#@branch_sha/#{path}"
      contents  = {}
      if File.directory?(full_path)
        files.each do |name|
          contents[name] = File.read("#{full_path}/#{name}", mode: 'rb') || ''
        end
        contents
      end
    end

    def write_cached_files(path, files)
      full_path = "./#@cache_path/#@branch_sha/#{path}"
      FileUtils.mkdir_p full_path
      files.each do |name, content|
        File.open("#{full_path}/#{name}", 'wb') { |f| f.write content }
      end
    end


    def get_file(url)
      cache_path = "./#@cache_path#{URI(url).path}"
      FileUtils.mkdir_p File.dirname(cache_path)
      if File.exists?(cache_path)
        log_http_get_file url, true
        File.read(cache_path, mode: 'rb')
      else
        log_http_get_file url, false
        content = open(url).read
        File.open(cache_path, 'wb') { |f| f.write content }
        content
      end
    end

    # get sha of the branch (= the latest commit)
    def get_branch_sha
      return @branch if @branch =~ /\A[0-9a-f]+\z/
      cmd = "git ls-remote 'https://github.com/#@repo' | awk '/#@branch/ {print $1}'"
      log cmd
      @branch_sha ||= %x[#{cmd}].chomp
      raise 'Could not get branch sha!' unless $?.success?
      @branch_sha
    end

    # Get the sha of a dir
    def get_tree_sha(dir)
      get_trees['tree'].find { |t| t['path'] == dir }['sha']
    end

    def get_trees
      @trees ||= get_json("https://api.github.com/repos/#@repo/git/trees/#@branch_sha")
    end

    def get_json(url)
      JSON.parse get_file(url)
    end
  end
end
