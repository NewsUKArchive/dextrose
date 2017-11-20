import wd from "wd";
import path from "path";

const host = "localhost";
const port = 4723;
let platformName;
let platformVersion;
let deviceName;
let app;


export default async(config) => {
    if (!config) {
        throw new Error(`expected appium config but got: ${config}`)
    }

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
            automationName: config.automationName || null
        },
        host,
        port
    };

    global.driver = driver;
    await driver.init(options.desiredCapabilities).setImplicitWaitTimeout(300000);
    global.asserter = wd.asserters;

    if (config.platformName.toLowerCase() === "ios") {
        return global.driver.waitForElementsByAccessibilityId(
            'fructose',
            global.asserter.isDisplayed,
            1800000
        );
    } else if (config.platformName.toLowerCase() === "android") {
        return global.driver.waitForElementsByXPath(
            '//*[@text="Fructose"]',
            global.asserter.isDisplayed,
            1800000
        );
    } else {
        throw new Error("Please set platformName in dextrose config")
    }
}