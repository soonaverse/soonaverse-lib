#!/bin/sh
./node_modules/.bin/tsdx build

# Build easy to use lib.
cd js-lib
rm -fr dist/
npm install
npm run build
cp dist/soon.js ../dist/