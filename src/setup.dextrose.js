
import Snapper from "./snapper";
import path from "path";
import wd from "wd";
import fructose from "@times-components/fructose/setup";
import dextroseClient from "./client/index"
import log from "./logger"

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
      global.asserter = wd.asserters;
      return global.driver.waitForElementsByXPath(
        '//*[@text="Fructose"]',
        global.asserter.isDisplayed,
        1800000
      );
}


const setup = async () => {
  await fructose.hooks.mobile.setup()
  const client = dextroseClient(7811)
  await setUpAppium();
  const snapper = new Snapper("android");
  const componentsLoaded = await client.getLoadedComponents();
  log.info('setup', componentsLoaded)

  for( let i = 0; i < componentsLoaded.length; i++ ) {
    await client.loadComponent(componentsLoaded[i]);
    await snapper.snap(__dirname + componentsLoaded[i]);
  }
}

setup();





