xcrun simctl boot 'iPhone 7'

rm snaps/hello_worlds.ios.png || echo "hello_worlds.ios.png does not exist"
rm snaps/goodbyeWorld.ios.png || echo "goodbyeWorld.ios.png does not exist"

./node_modules/.bin/react-native start --root $(pwd) --projectRoots $(pwd) --reset-cache &
PACKAGER_PID=$!
./node_modules/.bin/react-native run-ios --no-packager
sleep 20
node "../bin/run" run --config ./fructose/dextrose.ios.js --snapshotWait 2000 --loglevel verbose

