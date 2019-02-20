rm -r ./gh-pages
mkdir gh-pages

npm install
npm run build

cp -r public gh-pages/public
cp index.html gh-pages/.
cp default.html gh-pages/.

./node_modules/.bin/gh-pages -d gh-pages
