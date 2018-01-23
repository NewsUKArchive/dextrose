appium &
APPIUM_PID=$!
xcrun simctl boot 'iPhone 7'

npx react-native start --root $(pwd) --projectRoots $(pwd) &
PACKAGER_PID=$!
react-native run-ios --no-packager
npx dextrose run --config ./fructose/dextrose.ios.js --snapshotWait 2000 --loglevel verbose

kill -9 $PACKAGER_PID
kill -9 $APPIUM_PID