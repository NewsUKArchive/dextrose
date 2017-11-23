import log from "./logger";
import fs from "fs";
module.exports = class WebSnapper {
    constructor(platform, browser) {
        this.platform = platform.toLowerCase();
        this.browser = browser;
    }

    snap(outputPath) {
        if (typeof outputPath !== 'string') {
            throw Error(`Output path should be a string recieved: ${outputPath}`);
        }

        return new Promise((resolve, reject) => {

            const outputPathWithExtension = `${outputPath}.${this.platform}.png`
            log.verbose('web-snapper', `taking snapshot at path: ${outputPathWithExtension}`)
            this.browser.takeScreenshot((err, screenshot) => {
                if (err) {
                    reject(err);
                }

                fs.writeFileSync(outputPathWithExtension, screenshot, 'base64');
                resolve();
            })
        });
    }
};