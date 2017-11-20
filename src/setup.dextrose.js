import Snapper from "./snapper";
import fructose from "@times-components/fructose/setup";
import dextroseClient from "./client/index"
import log from "./logger"
import setUpAppium from "./setup.appium"

let client;

const setup = async (config) => {
  if (process.env.DEVICETYPE === "ios" | process.env.DEVICETYPE === "android") {
    await fructose.hooks.mobile.setup()
  }

  await setUpAppium(config);
  client = dextroseClient(7811)
  return client;
}

const tearDown = async () => {
  client.disconnect()
  log.verbose('Dextrose', 'torn down client')

  await fructose.hooks.mobile.cleanup();
  log.verbose('Dextrose', 'fructose server torn down')

}

export { setup, tearDown }