import Snapper from "./snapper"
import log from "./logger";

export default async (client, config) => {
  console.log(config)
    const snapper = new Snapper(config.deviceType);
    const componentsLoaded = await client.getLoadedComponents();

    for (let i = 0; i < componentsLoaded.length; i++) {
      await client.loadComponent(componentsLoaded[i]);
      snapper.snap(`${config.snapPath}/${componentsLoaded[i]}`)
      .then(() => log.info('snapBatcher', `Snapped component: ${componentsLoaded[i]}`))
      .catch(err => new Error(`component ${componentLoaded[i]} threw error: ${err}`));
    }
}