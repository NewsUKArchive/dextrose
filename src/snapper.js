const { execSync } = require("child_process");

module.exports = class Snapper {
  constructor(platform) {
    this.setPlatform(platform);
  }

  setPlatform(platform) {
    if (!(platform === "ios" || platform === "android")) {
      throw Error(`platform ${platform} is not either ios or android`);
    }
    this.platform = platform;
  }

  snap(outpath) {
    return new Promise (resolve => {
      if (typeof outpath !== "string") {
        throw Error("path must be string");
      }
      const outpathWithExtension = `${outpath}.png`

      execSync(`npx osnap ${this.platform} -f ${outpathWithExtension}`);
      resolve();
      });
    }
};
