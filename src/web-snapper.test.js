import Snapper from "./web-snapper";

jest.mock("fs");

describe("web-snapper", () => {

    let snapper;
    let fakeBrowser;
    let config;

    beforeEach(() => {

        fakeBrowser = {
            takeScreenshot: () => {},
            setWindowSize: () => {}
        }

        config = {
            platformName: 'web',
            breakpoints: [1000]
        }
    });

    it("has the ability to snap a browser", async() => {
        fakeBrowser.takeScreenshot = jest.fn(cb => cb(null, "someScreenshot"));
        const webSnapper = new Snapper(config, fakeBrowser);
        await webSnapper.snap("outputDir");
        expect(fakeBrowser.takeScreenshot.mock.calls.length).toBe(1);

    });

    it("throws when snap fails", () => {
        const error = new Error("stop, error time");
        fakeBrowser.takeScreenshot = jest.fn(() => {throw error });
        const webSnapper = new Snapper(config, fakeBrowser);
        expect(webSnapper.snap("output")).rejects.toBe(error);
    });

    it("throws an error when path is not a string", async() => {
        const webSnapper = new Snapper(config, fakeBrowser);
        try {
            await webSnapper.snap();
        } catch (err) {
            expect(err.message).toMatch('Output path should be a string recieved');
        }
    });

    it("loops through all specified breakpoints", async() => {
        expect.assertions(1);
        config.breakpoints = [1, 2, 3];
        fakeBrowser.setWindowSize = jest.fn();
        const webSnapper = new Snapper(config, fakeBrowser);

        await webSnapper.snap("outputDir");
        expect(fakeBrowser.setWindowSize.mock.calls.length).toBe(3);

    });

    it("rejects when resize fails", () => {
        const error = new Error("stop, error time");
        fakeBrowser.setWindowSize = jest.fn(() => { throw error});
        const webSnapper = new Snapper(config, fakeBrowser);
        expect(webSnapper.snap("output")).rejects.toBe(error);
    });
});