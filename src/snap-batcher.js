import log from "./logger";

export default async(dextrose, config, teardown) => {
  try {
    const componentsLoaded = await dextrose.client.getLoadedComponents();

    let filteredComponents;

    if (!config.ignoredStories) {
      filteredComponents = componentsLoaded;
    } else {
      filteredComponents = componentsLoaded.filter(component => config.ignoredStories.some(ignored => !component.includes(ignored)));
    }

    log.verbose('snapBatcher', `Found Loaded components in the App: ${componentsLoaded}`)
    log.info('snapBatcher', `Will Load App Components: ${filteredComponents}`)

    for (let i = 0; i < filteredComponents.length; i++) {
      await dextrose.client.loadComponent(filteredComponents[i]);
      const outputName = filteredComponents[i].replace(/\s/g, "_").replace(/[\[\]\\+.,\/#!$%\^&\*;:{}=\-`'~()]/g,"");        
      await dextrose.snapper.snap(`${config.snapPath}/${outputName}`)

      log.info('snapBatcher', `Snapped component: ${filteredComponents[i]}`)
    }
  } catch (err) {
    throw (err)
  } finally {

    teardown();
  }
}