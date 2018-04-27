/Users/kourosaliabadi/Library/Android/sdk/tools/emulator @Nexus_5X_API_25 -no-boot-anim &

adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723

./node_modules/.bin/react-native run-android --variant=release --no-packager
node "../bin/run" run --config ./fructose/dextrose.android.js --snapshotWait 2000 --loglevel verbose
