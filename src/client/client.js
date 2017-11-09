class DextroseClient {
    constructor(socketClient) {
        this.socket = socketClient;
    }

    getLoadedComponents() {
        return new Promise(resolve => {
            this.socket.on('bundled-components', componentList => {
                resolve(componentList)
            });

            this.socket.emit('getAppComponents');
        });
    }

    disconnect() {
        this.socket.disconnect();
    }
}

module.exports = DextroseClient;