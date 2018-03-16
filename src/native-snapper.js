import path from 'path';
import shell  from 'shelljs';
import log from './logger';


const handleExec = (code, stdout, stderr) => {
  if (code !== 0) {
    reject(stderr);
  }
}
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
        proc = shell.exec(`xcrun simctl io booted ${outputPathWithExtension}`);
      } else {
        proc = shell.exec(`adb shell screencap -p ${outputPathWithExtension}`);
      }

      proc.code === 0 ? resolve() : reject(proc.stderr) 

    });
  }
};