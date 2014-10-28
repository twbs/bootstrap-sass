#!/bin/sh

# Test compilation with node-sass binary

mkdir -p tmp/node-sass
node-sass assets/stylesheets/bootstrap -o tmp/node-sass/bootstrap.css && \
node-sass assets/stylesheets/bootstrap/theme -o tmp/node-sass/bootstrap-theme.css || \
(echo "node-sass compilation failed" && exit 1)
