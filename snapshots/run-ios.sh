xcrun simctl boot 'iPhone 7'

rm snaps/*

./node_modules/.bin/react-native bundle --platform ios --dev false --reset-cache --entry-file index.js --bundle-output ios/main.jsbundle
PACKAGER_PID=$!
./node_modules/.bin/react-native run-ios --configuration Release --no-packager
node "../bin/run" run --config ./fructose/dextrose.ios.js --snapshotWait 2000 --loglevel verbose
