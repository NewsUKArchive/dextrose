import setupDextrose from "./setup.dextrose";
import snapBatcher from "./snapBatcher";
import path from "path";

export default async (config) => {
    const dextrose = await setupDextrose(config);
    await snapBatcher(dextrose, config.snapPath);

    //tear down
}
