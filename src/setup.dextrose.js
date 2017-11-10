
import Snapper from "./snapshots/snapper";
import path from "path";
import wd from "wd";
import fructose from "@times-components/fructose/setup";
import dextroseClient from "./client/index"

const setUpAppium = async() => {
    const driver = wd.promiseChainRemote({
      host: "localhost",
      port: 4723
    });

    const options = {
        desiredCapabilities: {
          autoGrantPermissions: true,
          browserName: "",
          platformName: "Android",
          platformVersion: "7.1.1",
          deviceName: "Android Emulator",
          app: path.join(
            __dirname,
            "../android/app/build/outputs/apk/app-debug.apk"
          )
        },
        host: "localhost",
        port: 4723
      };
      global.driver = driver;
      await driver.init(options.desiredCapabilities).setImplicitWaitTimeout(300000);

      await global.driver.waitForElementsByXPath(
        '//*[@text="Fructose"]',
        global.asserter.isDisplayed,
        1800000
      );
}

export default async (platform) => {
    await fructose.hooks.mobile.setup();
    await setUpAppium();
    const client = dextroseClient(7811)
    const snapper = new Snapper(platform);
}




