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

export default async(config) => {
    console.log('------------------------------------');
    console.log(config);
    console.log('------------------------------------');
    let dextrose;

    if (config.platformName.toLowerCase() === "ios" || config.platformName.toLowerCase() === "android") {
        process.env.NATIVE = true;
    } else if (config.platformName === "web") {
        process.env.WEB = true;
    }

    process.env.DEVICETYPE = config.platformName.toLowerCase();

    if (process.env.NATIVE) {
        log.info('Dextrose Index', 'Running Native Config 📱')
        dextrose = await setupMobile(config);
        dextrose.snapper = new NativeSnapper(config.platformName)
        await snapBatcher(dextrose, config.snapPath, tearDownMobile);

    } else if (process.env.WEB) {
        log.info('Dextrose Index', 'Running Web Config 💻')
        dextrose  = await setupWeb();
        dextrose.snapper = new WebSnapper(config.platformName, dextrose.browser)
        await snapBatcher(dextrose, config.snapPath, tearDownWeb);

    } else {
        throw new Error('Please set a valid platformName "Web | Android | iOS"');
    }

    log.info('Dextrose Index', 'All components snapped 🤙')

}