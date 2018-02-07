./node_modules/.bin/selenium-standalone install &&
./node_modules/.bin/selenium-standalone start & 
./node_modules/.bin/react-native start --config $(pwd)/rn-cli.config.js --reset-cache &
./node_modules/.bin/fructose-web -d fructose &

./node_modules/.bin/dextrose --config ./fructose/dextrose.web.js -t 2000 --loglevel verbose