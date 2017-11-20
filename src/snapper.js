import log from "./logger";
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
      log.verbose('snapper', `taking snapshot at path: ${outputPathWithExtension}`)
      execSync(`npx osnap ${this.platform} -f ${outputPathWithExtension}`);
      resolve();
    });
  }
};