import Snapper from "./web-snapper";

jest.mock("fs");

describe("web-snapper", () => {

    let snapper;
    const fakeBrowser = {
        takeScreenshot: null
    }

    it("has the ability to snap a browser", () => {
        fakeBrowser.takeScreenshot = jest.fn(cb => cb(null, "someScreenshot"));
        const webSnapper = new Snapper("web", fakeBrowser)

        webSnapper.snap("outputDir")
        .then(() => {
            expect(fakeBrowser.takeScreenshot.mock.calls.length).toBe(1)
        })
    });

    it("reject when snap fails", () => {
        const error = "stop, error time"
        fakeBrowser.takeScreenshot = jest.fn(cb => cb(error, null));
        const webSnapper = new Snapper("web", fakeBrowser)
        expect(webSnapper.snap("output")).rejects.toBe(error)
    });

    it("throws an error when path is not a string", () => {
        const webSnapper = new Snapper("web", fakeBrowser)
        expect(() => webSnapper.snap()).toThrow();
    })
})