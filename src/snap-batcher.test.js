import snapBatcher from "./snap-batcher";

jest.mock("./native-snapper.js");
jest.mock("./web-snapper.js");

const dextroseMock = {
    client: {
        getLoadedComponents: jest.fn().mockReturnValue(['component1', 'component2', '3']),
        loadComponent: jest.fn()
    },
    snapper: {
        snap: jest.fn()
    }
}

const snapPath = "path";

const teardown = jest.fn();

describe("Snap batcher", () => {

    it("snaps for each loaded component", async() => {
        await snapBatcher(dextroseMock, snapPath, teardown);
        expect(dextroseMock.snapper.snap.mock.calls.length).toBe(3)
    });

    it("tears down after batcher is finished", async() => {
        await snapBatcher(dextroseMock, snapPath, teardown);
        expect(teardown.mock.calls.length).toBe(2);
    });

    it("tears down if error is thrown", async() => {
        dextroseMock.client.loadComponent = () => {
            throw new Error('some error');
        }
        expect.assertions(2);

        try {
            await snapBatcher(dextroseMock, snapPath, teardown)
        } catch (err) {
            expect(err.message).toBe("some error")
            expect(teardown.mock.calls.length).toBe(3);
        }
    });
})