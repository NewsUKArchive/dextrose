import { setup, tearDown } from "./setup.dextrose";
import snapBatcher from "./snapBatcher";
import path from "path";
import log from "./logger";

export default async (config) => {
    const dextrose = await setup(config);
    await snapBatcher(dextrose, config.snapPath);
    log.info('Dextrose Index', 'All components snapped 🤙')
    
    tearDown();
}
