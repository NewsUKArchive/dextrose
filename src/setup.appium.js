import wd from "wd";
import path from "path";

const host = "localhost";
const port = 4723;
let platformName;
let platformVersion;
let deviceName;
let app;


export default async () => {
    const driver = wd.promiseChainRemote({
        host,
        port
    });

    if (process.env.DEVICETYPE === "android") {
        platformName = "Android";
        platformVersion = "7.1.1";
        deviceName = "Android Emulator";
        app = path.join(
            __dirname,
            "../e2eTests/android/app/build/outputs/apk/app-debug.apk"
        )
    } else if (process.env.DEVICETYPE === "ios") {
        platformName = "Ios";
        platformVersion = "7.1.1";
        deviceName = "Android Emulator";
        app = path.join(
            __dirname,
            "."
        )
    } else {
        throw new Error('please set DEVICETYPE env variable')
    }

    const options = {
        desiredCapabilities: {
            autoGrantPermissions: true,
            browserName: "",
            platformName,
            platformVersion,
            deviceName,
            app
        },
        host,
        port
    };

    global.driver = driver;
    await driver.init(options.desiredCapabilities).setImplicitWaitTimeout(300000);
    global.asserter = wd.asserters;
    return global.driver.waitForElementsByXPath(
        '//*[@text="Fructose"]',
        global.asserter.isDisplayed,
        1800000
    );
}