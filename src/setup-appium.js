import wd from "wd";
import path from "path";
import { AndroidUiautomator2Driver } from "appium-uiautomator2-driver"


const host = "localhost";
const port = 4723;
let platformName;
let platformVersion;
let deviceName;
let app;

const iosAppium = async (config) => {
    const driver = wd.promiseChainRemote({
        host,
        port
    });

    const options = {
        desiredCapabilities: {
            autoGrantPermissions: true,
            browserName: "",
            platformName: config.platformName,
            platformVersion: config.platformVersion,
            deviceName: config.deviceName,
            app: config.app,
            automationName: config.automationName || null,
            newCommandTimeout: config.newCommandTimeout
        },
        host,
        port
    };

    await driver.init(options.desiredCapabilities).setImplicitWaitTimeout(300000);
}

const androidAppium = async (config) => {
    let defaultCaps = {
        app: config.app,
        deviceName: config.deviceName,
        platformName: config.platformName,
        automationName: 'uiautomator2'
      };

      let driver = new AndroidUiautomator2Driver();
      await driver.createSession(defaultCaps);
}

//TODO: proper handling of errors with reject
export default async (config) => {
    if (!config) {
        throw new Error(`expected appium config but got: ${config}`)
    }

    const connectAppium =  process.env.DEVICETYPE == 'ios' ? iosAppium : androidAppium
    await connectAppium(config);
}
