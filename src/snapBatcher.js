import NativeSnapper from "./native-snapper"
import WebSnapepr from "./web-snapper"
import log from "./logger";

export default async (client, config) => {

    const snapper = process.env.NATIVE ? new NativeSnapper(config.deviceType) : new WebSnapper();
    const componentsLoaded = await client.getLoadedComponents();
console.log(componentsLoaded)
    for (let i = 0; i < componentsLoaded.length; i++) {
      await client.loadComponent(componentsLoaded[i]);
      snapper.snap(`${config.snapPath}/${componentsLoaded[i]}`)
      .then(() => log.info('snapBatcher', `Snapped component: ${componentsLoaded[i]}`))
      .catch(err => new Error(`component ${componentsLoaded[i]} threw error: ${err}`));
    }
}