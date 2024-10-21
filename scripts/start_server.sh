#!/bin/bash
export PATH="$PATH:/usr/local/nvm/versions/node/v14.20.1/bin/"
cd /var/www/html/cityfinance/cityfinance-ng-ui
npm install --force
npm install --save @types/lodash@4.14.74 --force
npm run build
rm -rf dist_live/
mv dist/ dist_live/