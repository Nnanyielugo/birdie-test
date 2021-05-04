#!/bin/bash
cd ../front-end
npm run build

cd ../backend
rm -rf lib/public
npm run build

cp -pPR -f ../front-end/build lib/public
