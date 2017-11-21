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
        process.env.NATIVE = false;
    }

    process.env.DEVICETYPE = config.platformName.toLowerCase();

    console.log(process.env.DEVICETYPE)
    console.log(process.env.NATIVE)

    if (process.env.NATIVE) {
        log.info('Dextrose Index', 'Running Native Config 📱')
        dextrose = await setupMobile(config);

        snapConfig = {
            snapPath: config.snapPath,
            deviceType: config.platformName
        }

    } else if (process.env.WEB) {
        log.info('Dextrose Index', 'Running Web Config 💻')
        //ned to build webpack and get all that jazz working 
        dextrose = await setupWeb(config);
        // snapConfig = {
        //     snapPath: config.snapPath,
        //     deviceType: config.platformName
        // }
    } else {
        throw new Error('Please set a valid platformName "Web | Android | iOS"');
    }

    await snapBatcher(dextrose, snapConfig);
    log.info('Dextrose Index', 'All components snapped 🤙')
    tearDown();
}