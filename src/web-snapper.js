import log from "./logger";
import fs from "fs";
module.exports = class WebSnapper {
    constructor(config, browser) {
        this.platform = config.platform.toLowerCase();
        this.browser = browser;
        this.breakpoints = config.breakpoints;
    }

    snap(outputPath) {
        if (typeof outputPath !== 'string') {
            throw Error(`Output path should be a string recieved: ${outputPath}`);
        }

        const snapWeb = () =>
            new Promise((resolve, reject) => {
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

        return new Promise(async(resolve, reject) => {
            for (let i = 0; i < this.breakpoints.length; i++) {
                await snapWeb()
                .catch((err) => {
                    reject(err)
                });
            }
            resolve();
        })

    }
};