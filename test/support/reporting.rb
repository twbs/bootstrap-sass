module Kernel
  def silence_stdout_if(cond, &run)
    silence_stream_if(cond, STDOUT, &run)
  end

  def silence_stderr_if(cond, &run)
    silence_stream_if(cond, STDERR, &run)
  end

  def silence_stream_if(cond, stream, &run)
    if cond
      silence_stream(stream, &run)
    else
      run.call
    end
  end

  def silence_stream(stream)
    old_stream = stream.dup
    stream.reopen(File::NULL)
    stream.sync = true
    yield
  ensure
    stream.reopen(old_stream)
    old_stream.close
  end unless method_defined?(:silence_stream)
end
