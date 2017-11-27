# appium &
# APPIUM_PID=$!
emulator @Nexus_5X_API_25 -no-boot-anim &
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723

# react-native run-android --no-packager
# LOGLEVEL=verbose node run-dextrose.android.js

LOGLEVEL=verbose dextrose --config ./fructose/dextrose.android.js