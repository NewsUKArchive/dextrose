import Snapper from "./snapper"
import log from "./logger";

export default async (client, outputPath) => {
    const snapper = new Snapper(process.env.DEVICETYPE);
    const componentsLoaded = await client.getLoadedComponents();

    for (let i = 0; i < componentsLoaded.length; i++) {
      await client.loadComponent(componentsLoaded[i]);
      await snapper.snap(`${outputPath}${componentsLoaded[i]}`);
      log.info('snapBatcher', `Snapped component: ${componentsLoaded[i]}`)
    }
}