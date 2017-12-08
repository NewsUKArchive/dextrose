import log from "./logger";
import fs from "fs";

const browserHeight = 1200;

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = class WebSnapper {
    constructor(config, browser) {
        this.platform = config.platformName.toLowerCase();
        this.browser = browser;
        this.breakpoints = config.breakpoints;
        this.wait = config.snapshotWait;
    }

    async snap(outputPath) {
        if (typeof outputPath !== 'string') {
            throw Error(`Output path should be a string recieved: ${outputPath}`);
        }

        for (let i = 0; i < this.breakpoints.length; i++) {
            try {
                await this.browser.setWindowSize(this.breakpoints[i], browserHeight)
                if (this.wait) await snooze(this.wait);

                log.verbose('web-snapper', `set browser width to: ${this.breakpoints[i]}`)
                const outputPathWithExtension = `${outputPath}.${this.platform}.width-${this.breakpoints[i]}.png`
                await this.browser.takeScreenshot((err, screenshot) => {
                    fs.writeFileSync(outputPathWithExtension, screenshot, 'base64');
                    log.verbose('web-snapper', `wrote snapshot to path: ${outputPathWithExtension}`)
                });
            } catch (err) {
                throw err;
            }
        };
    }
}