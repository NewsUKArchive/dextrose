const blacklist = require("metro-bundler/src/blacklist");

module.exports = {
  getBlacklistRE() {
    return blacklist([
      /\/node_modules\/dextrose\/snapshots\/.*/,
    ]);
  }
};
