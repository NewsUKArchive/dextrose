import setupDextrose from "./setup.dextrose";
import snapBatcher from "./snapBatcher";
import path from "path";

export default async (snapPath) => {
    const dextrose = await setupDextrose();
    await snapBatcher(dextrose, snapPath);

    //tear down
}
