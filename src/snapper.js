const { execSync } = require("child_process");

module.exports = class Snapper {
  constructor(platform) {
    this.setPlatform(platform);
  }

  setPlatform(platform) {
    if (!(platform === "ios" || platform === "android")) {
      throw Error(`platform ${platform} is not either 'ios' or 'android'`);
    }
    this.platform = platform;
  }

  snap(outputPath) {
    if (typeof outputPath !== 'string') {
      throw Error(`Output path should be a string recieved: ${outputPath}`);
    }

    return new Promise (resolve => {
      const outputPathWithExtension = `${outputPath}.png`

      execSync(`npx osnap ${this.platform} -f ${outputPathWithExtension}`);
      resolve();
      });
    }
};
