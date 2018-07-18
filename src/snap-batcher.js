import fs from 'fs';
import log from './logger';

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

function containsIgnored(componentName, ignoredShowcases) {
  for (let i = 0; i < ignoredShowcases.length; i += 1) {
    if (componentName.includes(ignoredShowcases[i])) {
      return true;
    }
  }
  return false;
}

export default async ({ client, snapper }, config, teardown) => {
  const notIgnored = componentName =>
    !containsIgnored(componentName, config.ignoredShowcases);
  try {

    const componentsLoaded = await client.getLoadedComponents();

    let filteredComponents;

    if (!config.ignoredShowcases) {
      filteredComponents = componentsLoaded;
    } else {
      filteredComponents = componentsLoaded.filter(notIgnored);
    }

    if (!fs.existsSync(config.snapPath)) {
      log.info(
        'snapBatcher',
        `Snap path did not exist, creating directory: ${config.snapPath}`,
      );
      fs.mkdirSync(config.snapPath,);
    }

    log.verbose(
      'snapBatcher',
      `Found Loaded components in the App:\r\n${componentsLoaded.join('\r\n')}
    `,
    );

    log.info(
      'snapBatcher',
      `Found ${componentsLoaded.length} components loaded in app, will only load ${filteredComponents.length} due to filtering`,
    );

    log.info(
      'snapBatcher',
      `Will Load App Components:\r\n${filteredComponents.join('\r\n')}
  `,
    );

    for (let i = 0; i < filteredComponents.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await client.loadComponent(filteredComponents[i]);

      const outputName = filteredComponents[i]
        .replace(/\s/g, '_')
        .replace(/[\[\]\\+.,\/#!$%\^&\*;:{}=\-`'~()]/g, ''); // eslint-disable-line no-useless-escape

      // eslint-disable-next-line no-await-in-loop
      if (config.snapshotWait) await snooze(config.snapshotWait);

      // eslint-disable-next-line no-await-in-loop
      await snapper.snap(`${config.snapPath}/${outputName}`);
    }
  } catch (err) {
    log.error('snapBatcher', 'Error found while snapping images');
    throw err;
  } finally {
    teardown();
  }
};
