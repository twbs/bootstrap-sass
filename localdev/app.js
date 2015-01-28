/**
 * Module Dependencies
 **/

var http = require('http')
	, fs = require('fs')
  , path = require('path')
	, connect = require('connect')
	, sass = require('node-sass-middleware');

var srcPath = path.normalize(__dirname + '/../assets/stylesheets/coefficient')
	, destPath = __dirname + '/public/stylesheets';

/**
 * Create the server
 **/

var server = connect.createServer(sass({
      src: srcPath
    , dest: destPath
    , debug: true
    , outputStyle: 'expanded'
    , prefix:  '/stylesheets'
  	}),
	connect.static(__dirname + '/public')
);


/**
 * Handle static files
 **/
var assetsPath = path.normalize(__dirname + '/../assets/')
var vendorAssetsPath = path.normalize(__dirname + '/../vendor/assets/')

server.use(connect.static(__dirname + '/'));
server.use(connect.static(vendorAssetsPath));
server.use(connect.static(assetsPath));

/**
 * Listen
 **/

server.listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
