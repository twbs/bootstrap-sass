#!/bin/bash

# Test compilation with node-sass binary

mkdir -p tmp/node-sass
node_modules/.bin/node-sass assets/stylesheets/_bootstrap.scss -o tmp/node-sass/bootstrap.css && \
node_modules/.bin/node-sass --include-path=assets/stylesheets/ \
  assets/stylesheets/bootstrap/_theme.scss -o tmp/node-sass/bootstrap-theme.css || \
(echo "node-sass compilation failed" && exit 1)
