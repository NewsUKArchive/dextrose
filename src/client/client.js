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
            log.verbose('Dextrose Client', 'emitting get app components');
            this.socket.emit('getAppComponents');
        });
    }

    loadComponent(component) {
        return new Promise(resolve => {
            var timeoutExpired = false;
            var componentLoaded = false;
            this.socket.on("loaded", () => {
                log.verbose("client", `tests recieved component loaded" ${component}`);
                this.socket.removeListener('loaded');
                if (!timeoutExpired) {
                    componentLoaded = true;
                    resolve({msg: "component loaded", loaded: true});
                }
              });

          log.verbose("client", `tests emitting 'loadComponent' with : ${component}`);
          this.socket.emit("loadComponent", component);
          setTimeout( () => {
              if (!componentLoaded){
                timeoutExpired = true;
                resolve({msg: "component not loaded", loaded: false});  
              }
          }, 5000);

        });
      }

    disconnect() {
        this.socket.disconnect();
    }
}

module.exports = DextroseClient;