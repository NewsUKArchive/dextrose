import snapBatcher from "./snap-batcher";

jest.mock("./native-snapper.js");
jest.mock("./web-snapper.js");

const dextroseMock = {
    client: {
        getLoadedComponents: jest.fn().mockReturnValue(['component1', 'component2']),
        loadComponent: jest.fn()
    },

}

const snapPath =  "path";

const teardown = jest.fn();

describe("Snap batcher", () => {
    it("tears down if error is thrown", () => {
        dextroseMock.client.loadComponent = () => {
            throw new Error('some error');
        }

        expect(() => snapBatcher(dextroseMock, snapPath, teardown)).toThrow();
        expect(teardown.mock.calls.length).toBe(1);
    });

    it("calls snapper.snap() for each loaded component", () => {});
})