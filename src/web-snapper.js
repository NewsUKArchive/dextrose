import log from "./logger";
import fs from "fs";
module.exports = class Snapper {
    constructor(platform) {
        this.platform = platform.toLowerCase();
    }

    snap(outputPath) {
        if (typeof outputPath !== 'string') {
            throw Error(`Output path should be a string recieved: ${outputPath}`);
        }

        return new Promise((resolve, reject) => {
            log.info('web-snapper')

            const outputPathWithExtension = `${outputPath}.${this.platform}.png`
            log.verbose('web-snapper', `taking snapshot at path: ${outputPathWithExtension}`)
            global.browser.takeScreenshot((err, screenshot) => {
                if (err) {
                    reject(err);
                }

                fs.writeFileSync(outputPathWithExtension, screenshot, 'base64');
                resolve();
            })
        });
    }
};