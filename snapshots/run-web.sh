./node_modules/.bin/react-native start --reset-cache &
./node_modules/.bin/fructose-web -d $(pwd)/fructose &

node "../bin/run" run --config ./fructose/dextrose.web.js -t 2000 --loglevel verbose