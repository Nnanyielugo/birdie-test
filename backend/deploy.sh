bash build.sh

heroku login -i
git init
heroku git:remote -a birdie-test-0
git add .
git commit -am "initial commit"
git push heroku master
