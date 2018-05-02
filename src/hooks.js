
import fructose from '@times-components/fructose/setup'; // eslint-disable-line import/no-extraneous-dependencies
import log from './logger';

const setupMobile = async () => {
  const client  = await fructose.hooks.mobile.setup();
  return { client }
};

const setupWeb = async () => {
   return { client, chromeless } = await fructose.hooks.web.setup(3000, 10000);
};

const tearDownMobile = async () => {
  await fructose.hooks.mobile.cleanup();
};

const tearDownWeb = async () => {
  await fructose.hooks.web.cleanup();
};

export { setupMobile, tearDownMobile, setupWeb, tearDownWeb };