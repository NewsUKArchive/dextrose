/* globals describe it  afterAll expect */

const Client = require("./client");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const SocketClient = require("socket.io-client");

describe("Dextrose Client", () => {
    let app;
    let socketClient;
    let client;
    let server;
    let io;

    afterAll(() => {
        client.disconnect();
        io.close();
        server.close();
    });

    it(
        "returns a list of components loaded in the app",
        () =>
        new Promise(resolve => {
            const componentList = ['a', 'b', 'c'];

            app = express();
            server = http.Server(app);
            io = socketio(server);

            io.on("connection", socket => {
                socket.on("getAppComponents", () => {
                    io.emit("bundled-components", componentList);
                });
            });

            server.listen(0, async() => {
                const port = server.address().port;
                socketClient = SocketClient(`http://localhost:${port}`);
                const dextrose = new Client(socketClient)
                const returnedComponents = await dextrose.getLoadedComponents();
                expect(returnedComponents).toMatchObject(componentList)
                resolve();
            });
        })
    );
});
