#!/bin/bash
export PATH="$PATH:/usr/local/nvm/versions/node/v20.17.0/bin/"
cd /var/www/html/cityfinance/cityfinance-ng-ui-v2
npm i
npm run build1
rm -rf dist_live/
mv dist/ dist_live/
