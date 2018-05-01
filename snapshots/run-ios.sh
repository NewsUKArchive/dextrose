xcrun simctl boot 'iPhone 7'

rm snaps/*

./node_modules/.bin/react-native start --root $(pwd)  --reset-cache &
./node_modules/.bin/react-native run-ios --no-packager
node "../bin/run" run --config ./fructose/dextrose.ios.js --snapshotWait 2000 --loglevel verbose
