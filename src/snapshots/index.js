const fs = require("fs");
const Jimp = require("jimp");
const imageDiff = require("./differ");
const imageLoader = require("./loader");
const Snapper = require("./snapper");

const mkdir = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

module.exports = class AppSnapper {
  constructor(platform, snapsPath) {
    this.platform = platform;
    this.snapper = new Snapper(platform);
    this.snapPath = `${snapsPath}/${platform}/tmp`;
  }

  async snap(testname) {
    mkdir(this.snapPath);
    this.snapper.snap(`${this.snapPath}/${testname}.png`);
    const image = await Jimp.read(`${this.snapPath}/${testname}.png`);
    return new Promise(resolve => {
      image.scale(0.37, (err, _image) => {
        _image.write(`${this.snapPath}/${testname}.png`, resolve);
      });
    });
  }

  async diff(testname) {
    const tempShot = await imageLoader(`${this.snapPath}/${testname}.png`);
    const approvedShot = await imageLoader(
      `${this.approvedSnaps}/${testname}.png`
    );
    const { diffCount } = imageDiff(approvedShot, tempShot);
    return diffCount;
  }

  exists(testname) {
    const exists = fs.existsSync(`${this.approvedSnaps}/${testname}.png`);
    return exists;
  }
};
