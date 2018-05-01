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
  client = await fructose.hooks.web.setup(3000, 10000);
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
};

const tearDownWeb = async () => {
  await fructose.hooks.web.cleanup();
  await browser.quit();
};

export { setupMobile, tearDownMobile, setupWeb, tearDownWeb };