appium &
APPIUM_PID=$!

/Users/kourosaliabadi/Library/Android/sdk/tools/emulator @Nexus_5X_API_22 -no-boot-anim &
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723

# npx react-native start --root $(pwd) --projectRoots $(pwd) --reset-cache &
# PACKAGER_PID=$!

react-native run-android --variant=release
npx dextrose run --config ./fructose/dextrose.android.js --snapshotWait 2000 --loglevel verbose

kill -9 $PACKAGER_PID
kill -9 $APPIUM_PID