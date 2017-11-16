import Snapper from "./snapper";
import fructose from "@times-components/fructose/setup";
import dextroseClient from "./client/index"
import log from "./logger"
import setUpAppium from "./setup.appium"


export default setup = async () => {
    await fructose.hooks.mobile.setup()
    const client = dextroseClient(7811)
    await setUpAppium();
    return client;
}
