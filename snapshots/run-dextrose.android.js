const dextrose = require("../index").default;
const path = require("path");

const config = {
    snapPath: __dirname,
    platformName: "Android",
    platformVersion: "7.1.1",
    deviceName: "Android Emulator",
    app: path.join(
        __dirname,
        "./android/app/build/outputs/apk/app-debug.apk"
    )
}

dextrose(config);