import { setupWeb } from "./setup.dextrose";

describe('dextrose setup', () => {
    it("starts a browser", async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
        await setupWeb();
    })
})