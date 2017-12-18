import log from "./logger";
import path from "path";

const {
  execSync
} = require("child_process");

module.exports = class Snapper {
  constructor(platform) {
    this.platform = platform.toLowerCase();
  }

  snap(outputPath) {
    if (typeof outputPath !== 'string') {
      throw Error(`Output path should be a string recieved: ${outputPath}`);
    }

    return new Promise(resolve => {
      const outputPathWithExtension = `${outputPath}.${this.platform}.png`
      log.verbose('native-snapper', `taking snapshot at path: ${outputPathWithExtension}`)
      
      // TODO: need to make this reject if fails
      execSync(path.join(__dirname, '../node_modules/.bin/osnap ') + `${this.platform} -f ${outputPathWithExtension}`);
      resolve();
    });
  }
};
