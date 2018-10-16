// create debug instance from filename

import Debug from 'debug'
import path from 'path'
import pkg from '../../../../package.json'

const PATH_HEADS = [
  '/src/client/js',
  '/src/share',
  path.resolve('src/server'),
  path.resolve('build/server'),
  path.resolve('src/share')
]

function fileToName (filename) {
  if (typeof filename !== 'string') throw new Error('filename is not string')
  return filename
    .replace(new RegExp('^(' + PATH_HEADS.join('|') + ')'), pkg.name)
    .replace(/\..+$/, '') // file-ext
    .replace(/\/index$/, '') // 末尾index.jsは省略
    .replace(/\//g, ':')
}

module.exports = function createDebug (filename) {
  return Debug(fileToName(filename))
}
