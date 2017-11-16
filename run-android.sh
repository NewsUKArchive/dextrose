LOCAL=true npx fructose-tunnel
emulator @Nexus_5X_API_25 -no-boot-anim &
EMU_PID=$!
adb wait-for-device
adb reverse tcp:8081 tcp:8081
adb reverse tcp:7811 tcp:7811
adb reverse tcp:4723 tcp:4723

# react-native run-android --no-packager
LOGLEVEL=verbose DEVICETYPE=android NODE_ENV=LOCAL  node ./lib/index.js