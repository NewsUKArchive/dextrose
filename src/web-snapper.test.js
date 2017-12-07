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

    it("has the ability to snap a browser", () => {
        fakeBrowser.takeScreenshot = jest.fn(cb => cb(null, "someScreenshot"));
        const webSnapper = new Snapper(config, fakeBrowser)

        webSnapper.snap("outputDir")
            .then(() => {
                expect(fakeBrowser.takeScreenshot.mock.calls.length).toBe(1)
            })
    });

    it("throws when snap fails", () => {
        const error = "stop, error time"
        fakeBrowser.takeScreenshot = jest.fn(() => {throw new error(error)});
        const webSnapper = new Snapper(config, fakeBrowser)
        expect(() => webSnapper.snap("output")).toThrow();
    });

    it("throws an error when path is not a string", () => {
        const webSnapper = new Snapper(config, fakeBrowser)
        expect(() => webSnapper.snap()).rejects.toBe('1Output path should be a string recieved');
    });

    it("loops through all specified breakpoints", () => {
        expect.assertions(1)
        config.breakpoints = [1,2,3]
        fakeBrowser.setWindowSize = jest.fn();
        const webSnapper = new Snapper(config, fakeBrowser)

        webSnapper.snap("outputDir")
        .then(() => {
            expect(fakeBrowser.setWindowSize.mock.calls.length).toBe(3)
        }).catch( err => console.log('caght err  ' + err))
    })

    // it("rejects when resize fails", () => {
    //     const error = "stop, error time"
    //     fakeBrowser.setWindowSize = jest.fn(cb => cb(error, null));
    //     const webSnapper = new Snapper(config, fakeBrowser)
    //     expect(webSnapper.snap("output")).rejects.toBe(error)
    // })
})