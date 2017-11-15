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

    loadComponent(component, props) {
        return new Promise(resolve => {
          log.verbose("client", `tests emitting 'loadComponent' with : ${component}`);
          this.socket.emit("loadComponent", component, props);
          this.socket.on("loaded", () => {
            log.verbose("client", `tests recieved component loaded" ${component}`);
            resolve("component loaded");
          });
        });
      }

    disconnect() {
        this.socket.disconnect();
    }
}

module.exports = DextroseClient;