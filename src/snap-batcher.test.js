import snapBatcher from "./snap-batcher";

jest.mock("./native-snapper.js");
jest.mock("./web-snapper.js");

let dextroseMock;
let teardown;
let config;

describe("Snap batcher", () => {

    beforeEach( () => {
        dextroseMock = {
            client: {
                getLoadedComponents: jest.fn().mockReturnValue(['component1', 'component2', '3']),
                loadComponent: jest.fn()
            },
            snapper: {
                snap: jest.fn()
            }
        };
        teardown = jest.fn();
        config = {
            snapPath: 'path', 
            ignoredStories: ['ignorableComponent']
        }
        
    });

    it("snaps for each loaded component", async() => {
        await snapBatcher(dextroseMock, config, teardown);
        expect(dextroseMock.snapper.snap.mock.calls.length).toBe(3)
    });

    it("tears down after batcher is finished", async() => {
        await snapBatcher(dextroseMock, config, teardown);
        expect(teardown.mock.calls.length).toBe(1);
    });

    it("tears down if error is thrown", async() => {
        dextroseMock.client.loadComponent = () => {
            throw new Error('some error');
        }
        expect.assertions(2);

        try {
            await snapBatcher(dextroseMock, config, teardown)
        } catch (err) {
            expect(err.message).toBe("some error")
            expect(teardown.mock.calls.length).toBe(1);
        }
    });

    it("ignores components defined in config", async () => {
        config.ignoredStories = ["component2"];
        await snapBatcher(dextroseMock, config, teardown);    
        expect(dextroseMock.snapper.snap.mock.calls.length).toBe(2);
    });

    it("doesn't ignore when ignoreStories is undefined", async () => {
        config.ignoredStories = undefined;
        await snapBatcher(dextroseMock, config, teardown);    
        expect(dextroseMock.snapper.snap.mock.calls.length).toBe(3);
    });
})