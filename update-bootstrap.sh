#!/bin/bash

ROOT=`pwd`"/vendor/assets"
TMP='tmp/sass-twitter-bootstrap'

# the normal sass-twitter-bootstrap repo hasn't been updated to 3.2.1 yet
# REPO='https://github.com/jlong/sass-twitter-bootstrap.git'
# BRANCH='master'

# here is a forked repo that has been updated to 3.2.1
REPO='https://github.com/roverwolf/sass-twitter-bootstrap.git'
BRANCH='2.3.1-updates'

# Pull down sass-twitter-bootstrap sources
git clone -b $BRANCH $REPO tmp/sass-twitter-bootstrap
# Copy lib/ to stylesheets/
mkdir -p $ROOT/stylesheets/bootstrap
cp -r $TMP/lib/* $ROOT/stylesheets/bootstrap
# Copy js/ to javascripts/
cp -r $TMP/js/* $ROOT/javascripts
# Copy img/ to images/
cp -r $TMP/img/* $ROOT/images
# Remove tests
rm -r $ROOT/javascripts/tests
rm -r $ROOT/stylesheets/bootstrap/tests

# Patch the asset-url in _variables.scss
patch -f vendor/assets/stylesheets/bootstrap/_variables.scss < asseturl.patch

# Patch paths in bootstrap.scss and responsive.scss
sed --in-place=.bak 's_@import \"_@import \"bootstrap/_g' $ROOT/stylesheets/bootstrap/{bootstrap,responsive}.scss
rm $ROOT/stylesheets/bootstrap/*.bak

rm -rf $TMP