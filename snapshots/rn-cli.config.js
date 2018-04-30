const blacklist = require('metro/src/blacklist');

module.exports = {
  getBlacklistRE() {
    return blacklist([/\/node_modules\/dextrose\/snapshots\/.*/]);
  },
};
