#!/bin/bash
# Before install

rm -rf /var/www/html/cityfinance/cityfinancev1/
mkdir -p /var/www/html/cityfinance/cityfinancev1/

mv /var/www/html/cityfinance/cityfinancev1-deploy/.* /var/www/html/cityfinance/cityfinancev1/ 2>/dev/null
mv /var/www/html/cityfinance/cityfinancev1-deploy/* /var/www/html/cityfinance/cityfinancev1/

rm -rf /var/www/html/cityfinance/cityfinancev1-deploy/
