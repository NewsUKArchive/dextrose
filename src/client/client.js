import log from "../logger";

class DextroseClient {
    constructor(socketClient) {
        this.socket = socketClient;
    }

    getLoadedComponents() {
        return new Promise(resolve => {
            this.socket.on('bundled-components', componentList => {
                resolve(componentList)
            });

            log.info('Dextrose Client', 'emitting get app components');
            this.socket.emit('getAppComponents');
        });
    }

    loadComponent(component) {
        return new Promise(resolve => {
            this.socket.on("loaded", () => {
                log.verbose("client", `tests recieved component loaded" ${component}`);
                resolve("component-loaded");
              });

          log.verbose("client", `tests emitting 'loadComponent' with : ${component}`);
          this.socket.emit("loadComponent", component);
        });
      }

    disconnect() {
        this.socket.disconnect();
    }
}

module.exports = DextroseClient;