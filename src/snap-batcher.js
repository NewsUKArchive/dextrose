import util from "util";
import fs from "fs";
import log from "./logger";

const sleep = util.promisify(setTimeout);

function containsIgnored(componentName, ignoredStories) {
  for (story in ignoredStories) {
    if (componentName.includes(ignoredStories[story])) {
      return true;
    }
  }
  return false;
}

export default async(dextrose, config, teardown) => {
  try {
    const componentsLoaded = await dextrose.client.getLoadedComponents();

    let filteredComponents;

    if (!config.ignoredStories) {
      filteredComponents = componentsLoaded;
    } else {
      filteredComponents = componentsLoaded.filter((componentName) => !containsIgnored(componentName, config.ignoredStories));
    }

    if (!fs.existsSync(config.snapPath)) {
      log.info('snapBatcher', `Snap path did not exist, creating directory: ${config.snapPath}`)
      fs.mkdir(config.snapPath);
    }

    log.verbose('snapBatcher', `Found Loaded components in the App: ${componentsLoaded}`)
    log.info('snapBatcher', `Will Load App Components: ${filteredComponents}`)

    for (let i = 0; i < filteredComponents.length; i++) {
      await dextrose.client.loadComponent(filteredComponents[i]);
      const outputName = filteredComponents[i].replace(/\s/g, "_").replace(/[\[\]\\+.,\/#!$%\^&\*;:{}=\-`'~()]/g,"");
      await sleep(config.snapshotWait);      
      await dextrose.snapper.snap(`${config.snapPath}/${outputName}`)

      log.info('snapBatcher', `Snapped component: ${filteredComponents[i]}`)
    }
  } catch (err) {
    throw (err)
  } finally {

    teardown();
  }
}