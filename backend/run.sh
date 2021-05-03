cd ../front-end
npm run build

cd ../backend
rm -rf lib/public
npm run build

cp -pPR -f ../front-end/build lib/public
heroku login -i
git init
heroku git:remote -a birdie-test-0
git add .
git commit -am "make it better"
git push heroku master

# npm start