appium &
APPIUM_PID=$!

emulator @Nexus_5X_API_22 -no-boot-anim &
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723

react-native run-android --variant=release
npx dextrose run --config ./fructose/dextrose.android.js --snapshotWait 2000 --loglevel verbose

kill -9 $APPIUM_PID