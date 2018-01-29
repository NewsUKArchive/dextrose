const SocketClient = require("socket.io-client");
const DextroseClient = require("./client");

const sc = port => new SocketClient(`http://localhost:${port || 7811}`);
const dextroseClient = port => new DextroseClient(sc(port));

export default dextroseClient;
