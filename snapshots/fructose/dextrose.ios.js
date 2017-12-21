const path = require("path");

module.exports = {
    snapPath: path.join(__dirname, '../snaps'),    
    automationName: "XCUITest",
    platformName: "iOS",
    deviceName: "iPhone 6s",
    platformVersion: '10.3',
    app: path.join(
        __dirname,
        "../ios/build/Build/Products/Debug-iphonesimulator/snapshots.app"
    ),
    ignoredStories: ["IGNORE"]
}


