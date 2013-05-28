#!/bin/bash

ROOT=`pwd`"/vendor/assets"
TMP='tmp/sass-twitter-bootstrap'
# Pull down sass-twitter-bootstrap sources
git clone https://github.com/jlong/sass-twitter-bootstrap.git tmp/sass-twitter-bootstrap --branch '3.0.0-wip'
# Copy lib/ to stylesheets/
mkdir -p $ROOT/stylesheets/bootstrap
cp -r $TMP/lib/* $ROOT/stylesheets/bootstrap
# Copy js/ to javascripts/bootstrap
cp -r $TMP/js/* $ROOT/javascripts/bootstrap
# Copy img/ to images/
cp -r $TMP/img/* $ROOT/images
# Copy fonts/ to fonts/
cp -r $TMP/fonts/* $ROOT/fonts
# Remove tests
rm -r $ROOT/javascripts/bootstrap/tests

# Patch the asset-url in _glyphicons.scss
patch -f vendor/assets/stylesheets/bootstrap/_glyphicons.scss < asseturl.patch
rm $ROOT/stylesheets/bootstrap/_glyphicons.scss.orig

# Patch paths in bootstrap.scss and responsive.scss
sed -i .bak 's_@import \"_@import \"bootstrap/_g' $ROOT/stylesheets/bootstrap/bootstrap.scss
rm $ROOT/stylesheets/bootstrap/*.bak

rm -rf $TMP
