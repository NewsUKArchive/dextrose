import wd from "wd";
import path from "path";

const host = "localhost";
const port = 4723;
let platformName;
let platformVersion;
let deviceName;
let app;

//TODO: proper handling of errors with reject
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
            automationName: config.automationName || null,
            newCommandTimeout: config.newCommandTimeout            
        },
        host,
        port
    };

    global.driver = driver;
    await driver.init(options.desiredCapabilities).setImplicitWaitTimeout(300000);
    global.asserter = wd.asserters;
}