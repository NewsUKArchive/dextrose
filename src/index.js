import {
    setupMobile,
    setupWeb,
    tearDownMobile,
    tearDownWeb
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

    snapConfig = {
        snapPath: config.snapPath,
        deviceType: config.platformName
    }


    if (process.env.NATIVE) {
        log.info('Dextrose Index', 'Running Native Config 📱')
        dextrose = await setupMobile(config);
        await snapBatcher(dextrose, snapConfig, tearDownMobile);

    } else if (process.env.WEB) {
        log.info('Dextrose Index', 'Running Web Config 💻')
        dextrose  = await setupWeb();
        await snapBatcher(dextrose, snapConfig, tearDownWeb);

    } else {
        throw new Error('Please set a valid platformName "Web | Android | iOS"');
    }

    log.info('Dextrose Index', 'All components snapped 🤙')

}