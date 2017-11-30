appium &
APPIUM_PID=$!
npx react-native start --reset-cache & 
PACKAGER_PID=$!
npx react-native run-ios
LOGLEVEL=verbose npx dextrose --config ./fructose/dextrose.ios.js --timeout 600000 --snapshotWait 1000

kill -9 $APPIUM_PID
kill -9 $PACKAGER_PID