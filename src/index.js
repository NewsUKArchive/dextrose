import setupDextrose from "./setup.dextrose";
import snapBatcher from "./snapBatcher";
import path from "path";

const outputFolder = path.join(__dirname, "../output/")

setupDextrose()
    .then(async dextrose => {
        await snapBatcher(dextrose, outputFolder)
    })