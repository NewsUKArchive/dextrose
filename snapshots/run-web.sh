./node_modules/.bin/selenium-standalone install &&
./node_modules/.bin/selenium-standalone start 2> selenium.log& 
./node_modules/.bin/react-native start --reset-cache &
./node_modules/.bin/fructose-web -d $(pwd)/fructose  > webpack.log &

node "../bin/run" run --config ./fructose/dextrose.web.js -t 2000 --loglevel verbose