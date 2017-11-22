import NativeSnapper from "./native-snapper"
import WebSnapper from "./web-snapper"
import log from "./logger";

export default async(client, config, teardown) => {
  try {
    const snapper = process.env.NATIVE ? new NativeSnapper(config.deviceType) : new WebSnapper();
    const componentsLoaded = await client.getLoadedComponents();

    log.info('snapBatcher', `Loaded component: ${componentsLoaded}`)

    for (let i = 0; i < componentsLoaded.length; i++) {
      await client.loadComponent(componentsLoaded[i]);
      
      snapper.snap(`${config.snapPath}/${componentsLoaded[i]}`)
        .then(() => log.info('snapBatcher', `Snapped component: ${componentsLoaded[i]}`))
    }
  } catch (err) {

    throw new Error(err)
  } finally {

    teardown();
  }
}