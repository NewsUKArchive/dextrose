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
      const outputPathWithExtension = `${outputPath}.${this.platform}.jpeg`;
      log.verbose(
        'native-snapper',
        `taking snapshot at path: ${outputPathWithExtension}`,
      );

      const nativeScreenshotCommand = this.platform === 'ios' ?
        `xcrun simctl io booted screenshot ${outputPathWithExtension}` :
        `adb exec-out screencap -p > ${outputPathWithExtension}`;

      const screenshotResult = shell.exec(nativeScreenshotCommand);

      if (screenshotResult.code === 0) {
        resolve();
      } else {
        reject(screenshotResult.stderr);
      }
    });
  }
};
