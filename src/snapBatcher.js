import NativeSnapper from "./native-snapper"
import WebSnapper from "./web-snapper"
import log from "./logger";

export default async(dextrose, config, teardown) => {
  try {
    
    const snapper = process.env.NATIVE ? new NativeSnapper(config.deviceType) : new WebSnapper(config.deviceType, dextrose.browser);
    const componentsLoaded = await dextrose.client.getLoadedComponents();

    log.info('snapBatcher', `Found Loaded components in the App: ${componentsLoaded}`)

    for (let i = 0; i < componentsLoaded.length; i++) {
      await dextrose.client.loadComponent(componentsLoaded[i]);

      await snapper.snap(`${config.snapPath}/${componentsLoaded[i]}`)
        .then(() => log.info('snapBatcher', `Snapped component: ${componentsLoaded[i]}`))
    }
  } catch (err) {

    throw new Error(err)
  } finally {

    teardown();
  }
}