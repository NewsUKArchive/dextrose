import log from "./logger";

export default async(dextrose, config, teardown) => {
  try {
    const componentsLoaded = await dextrose.client.getLoadedComponents();
    const ignoredStories = config.ignoredStories;

    const filteredComponents = componentsLoaded.filter(component => ignoredStories.some(ignored => !component.includes(ignored)));
    
    console.log()
    log.info('snapBatcher', `Found Loaded components in the App: ${componentsLoaded}`)
    log.info('snapBatcher', `Will Load Components: ${filteredComponents}`)
    
    for (let i = 0; i < filteredComponents.length; i++) {
      await dextrose.client.loadComponent(filteredComponents[i]);
      await dextrose.snapper.snap(`${config.snapPath}/${filteredComponents[i]}`)

      log.info('snapBatcher', `Snapped component: ${filteredComponents[i]}`)
    }
  } catch (err) {
    throw (err)
  } finally {

    teardown();
  }
}