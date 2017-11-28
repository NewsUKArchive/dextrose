import snapBatcher from "./snap-batcher";

jest.mock("./native-snapper.js");
jest.mock("./web-snapper.js");

let dextroseMock;
let teardown;
const config = {
    snapPath: 'path', 
    ignoredStories: ['ignorableComponent']
}

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
        dextroseMock.client.getLoadedComponents = jest.fn().mockReturnValue( ["1", "2", "3", "I am a banana", "I am a rat", "I am a"]);
        config.ignoredStories = ["I am a"];
        await snapBatcher(dextroseMock, config, teardown);    
        expect(dextroseMock.snapper.snap.mock.calls.length).toBe(3);
    });
})