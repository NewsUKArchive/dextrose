import shell from 'shelljs';
import log from './logger';

module.exports = class Snapper {
  constructor(platform) {
    this.platform = platform.toLowerCase();
  }

  snap(outputPath) {
    if (typeof outputPath !== 'string') {
      throw Error(`Output path should be a string recieved: ${outputPath}`);
    }

    return new Promise((resolve, reject) => {
      const outputPathWithExtension = `${outputPath}.${this.platform}.png`;
      log.verbose(
        'native-snapper',
        `taking snapshot at path: ${outputPathWithExtension}`,
      );

      let proc;

      if (this.platform === 'ios') {
        proc = shell.exec(`xcrun simctl io booted screenshot ${outputPathWithExtension}`);
      } else {
        proc = shell.exec(`adb shell screencap -p ${outputPathWithExtension}`);
      }

      if (proc.code === 0) {
        resolve();
      }

      reject(proc.stderr);
    });
  }
};
