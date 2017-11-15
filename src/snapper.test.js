import Snapper from "./snapper";

describe('snapper', () => {
    it("snaps android", async () => {
        const snapper = new Snapper("android");
        await snapper.snap(`${__dirname}-test`);
    });
})