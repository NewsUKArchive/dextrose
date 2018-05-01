import fs from 'fs';

import log from './logger';

const browserHeight = 1200;
const defaultBrowserWidth = 1024;

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = class WebSnapper {
  constructor(config, chromeless) {
    this.platform = config.platformName.toLowerCase();
    this.chromeless = chromeless;
    this.breakpoints = config.breakpoints || [defaultBrowserWidth];
    this.wait = config.snapshotWait;
  }

  async snap(outputPath) {
    if (typeof outputPath !== 'string') {
      throw Error(`Output path should be a string recieved: ${outputPath}`);
    }

    for (let i = 0; i < this.breakpoints.length; i += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.chromeless.setViewport({width: this.breakpoints[i], height: browserHeight})

        // eslint-disable-next-line no-await-in-loop
        if (this.wait) await snooze(this.wait);

        log.verbose(
          'web-snapper',
          `set browser width to: ${this.breakpoints[i]}`,
        );

        const outputPathWithExtension = `${outputPath}.${this.platform}.width-${
          this.breakpoints[i]
        }.png`;
        
        // eslint-disable-next-line no-await-in-loop
         await chromeless.screenshot({ filePath: outputPathWithExtension })
         log.verbose(
          'web-snapper',
          `wrote snapshot to path: ${outputPathWithExtension}`,
        );
       
      } catch (err) {
        throw err;
      }
    }
  }
};
