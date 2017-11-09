# !/bin/bash
emulator @Nexus_5X_API_25 -no-boot-anim &
EMU_PID=$!
adb wait-for-device
yarn android

echo "Setting up socket connections..."
echo "...Packager"
adb reverse tcp:8081 tcp:8081

echo "...Websocket Server"
adb reverse tcp:7811 tcp:7811

appium &
APPIUM_PID=$!

# LOGLEVEL=verbose node .lib/setup.dextrose.js

# kill -9 $APPIUM_PID
# kill -9 $EMU_PID

