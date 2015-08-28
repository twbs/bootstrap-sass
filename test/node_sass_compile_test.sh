#!/bin/sh

# Test compilation with node-sass binary

mkdir -p tmp/node-sass
node-sass assets/stylesheets/_bootstrap.scss -o tmp/node-sass/ && \
node-sass assets/stylesheets/_bootstrap-flex.scss -o tmp/node-sass/ && \
node-sass assets/stylesheets/_bootstrap-grid.scss -o tmp/node-sass/ && \
node-sass assets/stylesheets/_bootstrap-reboot.scss -o tmp/node-sass/ || \
(echo "node-sass compilation failed" && exit 1)
