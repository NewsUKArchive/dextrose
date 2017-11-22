import fructose from "@times-components/fructose/setup";
import dextroseClient from "./client/index"
import log from "./logger"
import wd from "wd"
import setUpAppium from "./setup.appium"

let client;
let browser;


const setupMobile = async(config) => {
  await fructose.hooks.mobile.setup()
  await setUpAppium(config);
  client = dextroseClient(7811)
  return client;
}

const setupWeb = async() => {
  log.verbose('Dextrose', 'starting web')
  await fructose.hooks.web.setup(3000, 10000);
  client = dextroseClient(7811)
  browser = wd.promiseChainRemote();

  await browser
    .init({
      browserName:'chrome'
    })
    .get("http://localhost:3000")

    log.verbose('Dextrose', 'Browser open')
    return client;
}

const tearDownMobile = async () => {
  client.disconnect()
  log.verbose('Dextrose', 'torn down client')

  await fructose.hooks.mobile.cleanup();
  log.verbose('Dextrose', 'fructose server torn down')
}

const tearDownWeb = async () => {
  client.disconnect()
  log.verbose('Dextrose', 'torn down client')

  await fructose.hooks.web.cleanup();
  log.verbose('Dextrose', 'fructose server torn down')

  await browser.quit();
}

export {
  setupMobile,
  tearDownMobile,
  setupWeb,
  tearDownWeb
}