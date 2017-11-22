import log from "./logger";

module.exports = class Snapper {

  snap(outputPath) {
    if (typeof outputPath !== 'string') {
      throw Error(`Output path should be a string recieved: ${outputPath}`);
    }

    return new Promise(resolve => {
        log.info('web-snapper')
        resolve()
    });
  }
};