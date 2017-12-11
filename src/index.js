import {
    setupMobile,
    setupWeb,
    tearDownMobile,
    tearDownWeb
} from "./dextrose";
import snapBatcher from "./snap-batcher";
import path from "path";
import log from "./logger";
import NativeSnapper from "./native-snapper"
import WebSnapper from "./web-snapper"

const expectedFieldsWeb = ['snapPath', 'platformName', 'breakpoints']
const expectedFieldsNative = ['snapPath', 'platformName', 'platformVersion', 'deviceName', 'app']

const isConfigValid = (config) => {
    const expectedFields = process.env.NATIVE ? expectedFieldsNative : expectedFieldsWeb;
    expectedFields.map((property) => {
        if (config.hasOwnProperty(property)) {
            return;
        } else {
            throw new Error(`You are missing the property: ${property} in your config`)
        }
    });
}

export default async(config) => {
    let dextrose;

    if (config.platformName.toLowerCase() === "ios" || config.platformName.toLowerCase() === "android") {
        process.env.NATIVE = true;
    } else if (config.platformName === "web") {
        process.env.WEB = true;
    }

    isConfigValid(config);

    process.env.DEVICETYPE = config.platformName.toLowerCase();

    if (process.env.NATIVE) {
        log.info('Dextrose Index', 'Running Native Config 📱')
        dextrose = await setupMobile(config);
        dextrose.snapper = new NativeSnapper(config.platformName)
        await snapBatcher(dextrose, config, tearDownMobile);

    } else if (process.env.WEB) {
        log.info('Dextrose Index', 'Running Web Config 💻')
        dextrose  = await setupWeb();
        dextrose.snapper = new WebSnapper(config, dextrose.browser)
        await snapBatcher(dextrose, config, tearDownWeb);

    } else {
        throw new Error('Please set a valid platformName "Web | Android | iOS"');
    }

    log.info('Dextrose Index', 'All components snapped 🤙')

}