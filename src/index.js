import {
    setupMobile,
    setupWeb,
    tearDown
} from "./setup.dextrose";
import snapBatcher from "./snapBatcher";
import path from "path";
import log from "./logger";

export default async(config) => {

    let dextrose;
    let snapConfig;

    if (config.platformName.toLowerCase() === "ios" || config.platformName.toLowerCase() === "android") {
        process.env.NATIVE = true;
    } else if (config.platformName === "web") {
        process.env.WEB = true;
    }

    process.env.DEVICETYPE = config.platformName.toLowerCase();

    if (process.env.NATIVE) {
        log.info('Dextrose Index', 'Running Native Config 📱')
        dextrose = await setupMobile(config);

    } else if (process.env.WEB) {
        log.info('Dextrose Index', 'Running Web Config 💻')
        dextrose = await setupWeb();
    } else {
        throw new Error('Please set a valid platformName "Web | Android | iOS"');
    }

    snapConfig = {
        snapPath: config.snapPath,
        deviceType: config.platformName
    }

    //await snapBatcher(dextrose, snapConfig);
    log.info('Dextrose Index', 'All components snapped 🤙')
    tearDown();
}