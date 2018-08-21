require 'shellwords'
class Converter
  module Network
    protected

    def get_paths_by_type(dir, file_re, recursive = true)
      get_file_paths(dir, recursive).select { |path| path =~ file_re }
    end

    def get_file_paths(dir, recursive = true)
      get_tree(get_tree_sha(dir), recursive)['tree'].select { |f| f['type'] == 'blob' }.map { |f| f['path'] }
    end

    def read_files(path, files)
      full_path = "https://raw.githubusercontent.com/#@repo/#@branch_sha/#{path}"
      contents = read_cached_files(path, files)
      log_http_get_files contents.keys, full_path, true if contents.keys
      files -= contents.keys
      log_http_get_files files, full_path, false
      files.map do |name|
        Thread.start {
          contents[name] = open("#{full_path}/#{name}").read
          Thread.exclusive { write_cached_files path, name => contents[name] }
        }
      end.each(&:join)
      contents
    end

    def read_cached_files(path, files)
      full_path = "#@cache_path/#@branch_sha/#{path}"
      contents  = {}
      if File.directory?(full_path)
        files.each do |name|
          path = "#{full_path}/#{name}"
          contents[name] = File.read(path, mode: 'rb') if File.exist?(path)
        end
      end
      contents
    end

    def write_cached_files(path, files)
      full_path = "./#@cache_path/#@branch_sha/#{path}"
      files.each do |name, content|
        FileUtils.mkdir_p File.dirname(File.join(full_path, name))
        File.open("#{full_path}/#{name}", 'wb') { |f| f.write content }
      end
    end


    def get_file(url)
      uri = URI(url)
      cache_path = "./#@cache_path#{uri.path}#{uri.query.tr('?&=', '-') if uri.query}"
      FileUtils.mkdir_p File.dirname(cache_path)
      if File.exist?(cache_path)
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
      @branch_sha ||= begin
        if @branch + "\n" == %x[git rev-parse #@branch]
          @branch
        else
          cmd = "git ls-remote #{Shellwords.escape "https://github.com/#@repo"} #@branch"
          log cmd
          result = %x[#{cmd}]
          raise 'Could not get branch sha!' unless $?.success? && !result.empty?
          result.split(/\s+/).first
        end
      end
    end

    # Get the sha of a dir
    def get_tree_sha(dir, tree = get_trees)
      tree['tree'].find { |t| t['path'] == dir }['sha']
    end

    def get_trees
      @trees ||= get_tree(@branch_sha)
    end

    def get_tree(sha, recursive = true)
      get_json("https://api.github.com/repos/#@repo/git/trees/#{sha}#{'?recursive=1' if recursive}")
    end

    def get_json(url)
      JSON.parse get_file(url)
    end
  end
end
