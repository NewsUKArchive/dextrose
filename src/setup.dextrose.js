import Snapper from "./snapper";
import fructose from "@times-components/fructose/setup";
import dextroseClient from "./client/index"
import log from "./logger"
import setUpAppium from "./setup.appium"


export default setup = async (config) => {
  if (process.env.DEVICETYPE ==="ios" | process.env.DEVICETYPE === "android") {
    await fructose.hooks.mobile.setup()
  }
  
  await setUpAppium(config);
  const client = dextroseClient(7811)
  return client;
}