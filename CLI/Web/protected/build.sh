#!/bin/sh

# Make build folder
mkdir build/src

# Copy unprotected resources
cp src/*.html build/src/
cp src/*.css build/src/
cp src/*.svg build/src/
cp src/*.jpg build/src/

# Run JSDefender
jsdefender
