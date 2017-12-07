import log from "./logger";
import fs from "fs";
module.exports = class WebSnapper {
    constructor(config, browser) {
        this.platform = config.platformName.toLowerCase();
        this.browser = browser;
        this.breakpoints = config.breakpoints;
    }

    async snap(outputPath) {
        for (let i = 0; i < this.breakpoints.length; i++) {
            try {
                if (typeof outputPath !== 'string') {
                    throw Error(`Output path should be a string recieved: ${outputPath}`);
                }
                await this.browser.setWindowSize(this.breakpoints[i], 1200)

                log.verbose('web-snapper', `set browser window to: ${this.breakpoints[i]}`)

                const outputPathWithExtension = `${outputPath}.${this.platform}.width-${this.breakpoints[i]}.png`
                log.verbose('web-snapper', `taking snapshot at path: ${outputPathWithExtension}`)
                this.browser.takeScreenshot((err, screenshot) => {
                    fs.writeFileSync(outputPathWithExtension, screenshot, 'base64');
                })
            } catch (err) {
                throw err;
            }
        };
    }
}