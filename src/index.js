import { setupMobile, tearDown } from "./setup.dextrose";
import snapBatcher from "./snapBatcher";
import path from "path";
import log from "./logger";

export default async (config) => {

    let dextrose;
    let snapConfig;

    if (config.platformName.toLowerCase() === "ios" || config.platformName.toLowerCase() === "android") {
        dextrose = await setupMobile(config);

        snapConfig = {
            snapPath: config.snapPath,
            deviceType: config.platformName
        }
    }

    await snapBatcher(dextrose, snapConfig);
    log.info('Dextrose Index', 'All components snapped 🤙')
    tearDown();
}
