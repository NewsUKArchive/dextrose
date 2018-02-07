xcrun simctl boot 'iPhone 7'

rm snaps/hello_worlds.ios.png || echo "hello_worlds.ios.png does not exist"
rm snaps/goodbyeWorld.ios.png || echo "goodbyeWorld.ios.png does not exist"

./node_modules/.bin/react-native start --root $(pwd) --projectRoots $(pwd) --config $(pwd)/rn-cli.config.js --reset-cache &
PACKAGER_PID=$!
./node_modules/.bin/react-native run-ios --no-packager
./node_modules/.bin/dextrose run --config ./fructose/dextrose.ios.js --snapshotWait 2000 --loglevel verbose

kill -9 $PACKAGER_PID
