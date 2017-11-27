const SocketClient = require("socket.io-client");
const DextroseClient = require("./client");

const config = {
  transports: ["websocket"],
  query: {
    clientType: "snapper"
  }
};

const sc = port => new SocketClient(`http://localhost:${port || 7811}`, config);
const dextroseClient = port => new DextroseClient(sc(port));

export default dextroseClient;
