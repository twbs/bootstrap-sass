#!/bin/bash

ROOT=`pwd`"/vendor/assets"
TMP='tmp/sass-twitter-bootstrap'
# Pull down sass-twitter-bootstrap sources
git clone https://github.com/jlong/sass-twitter-bootstrap.git tmp/sass-twitter-bootstrap
# Copy lib/ to stylesheets/
cp -r $TMP/lib/* $ROOT/stylesheets
# Copy js/ to javascripts/
cp -r $TMP/js/* $ROOT/javascripts
# Copy img/ to images/
cp -r $TMP/img/* $ROOT/images
# Remove tests
rm -r $ROOT/javascripts/tests
rm -r $ROOT/stylesheets/tests

# Patch the asset-url in _variables.scss
patch -f vendor/assets/stylesheets/_variables.scss < asseturl.patch

rm -rf $TMP