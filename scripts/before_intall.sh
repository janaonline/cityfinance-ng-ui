#!/bin/bash
# Before install

if [ -d /var/www/html/cityfinance/cityfinancev1 ]; then
  echo "Deleting /var/www/html/cityfinance/cityfinancev1..."
  rm -rf /var/www/html/cityfinance/cityfinancev1
fi
