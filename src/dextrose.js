import wd from 'wd';
import fructose from '@times-components/fructose/setup'; // eslint-disable-line import/no-extraneous-dependencies
import log from './logger';

let client;
let browser;

const setupMobile = async () => {
  const client = await fructose.hooks.mobile.setup();
  return { client };
};

const setupWeb = async () => {
  log.verbose('Dextrose', 'starting web');
  await fructose.hooks.web.setup(3000, 10000);
  client = dextroseClient(7811);
  browser = wd.promiseChainRemote();

  await browser
    .init({
      browserName: 'chrome',
    })
    .get('http://localhost:3000');
  log.verbose('Dextrose', 'Browser open');
  return { client, browser };
};

const tearDownMobile = async () => {
  await fructose.hooks.mobile.cleanup();
  log.verbose('Dextrose', 'fructose server torn down');
};

const tearDownWeb = async () => {
  client.disconnect();
  log.verbose('Dextrose', 'torn down client');

  await fructose.hooks.web.cleanup();
  log.verbose('Dextrose', 'fructose server torn down');

  await browser.quit();
};

export { setupMobile, tearDownMobile, setupWeb, tearDownWeb };