import Snapper from "./snapper";
import fructose from "@times-components/fructose/setup";
import dextroseClient from "./client/index"
import log from "./logger"
import wd from "wd"
import setUpAppium from "./setup.appium"

let client;


const setupMobile = async(config) => {
  await fructose.hooks.mobile.setup()
  await setUpAppium(config);
  client = dextroseClient(7811)
  return client;
}

const setupWeb = async() => {
  await fructose.hooks.web.setup(3000, 60000);
  // chromeless = new Chromeless();
  // await chromeless
  //   .goto("http://localhost:3000")
  //   .exists("[data-testid='fructose']");
  
    log.verbose('Dextrose', 'Fructose ready')
  client = dextroseClient(7811)
}

const tearDown = async() => {
  client.disconnect()
  log.verbose('Dextrose', 'torn down client')

  await fructose.hooks.mobile.cleanup();
  log.verbose('Dextrose', 'fructose server torn down')
}

export {
  setupMobile,
  tearDown,
  setupWeb
}