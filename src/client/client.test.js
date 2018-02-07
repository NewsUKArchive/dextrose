/* globals describe it expect beforeAll afterEach */
const Client = require('./client');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const SocketClient = require('socket.io-client');

describe('Dextrose Client', () => {
  let app;
  let socketClient;
  let dextrose;
  let server;
  let io;

  beforeAll(() => {
    app = express();
    server = http.Server(app);
    io = socketio(server);
  });

  afterEach(() => {
    dextrose.disconnect();
    io.close();
    server.close();
  });

  it('waits for the app to load', () =>
    new Promise((resolve) => {
      io.on('connection', () => {
        io.emit('fructose-app-loaded');
      });

      server.listen(0, async () => {
        const { port } = server.address();
        socketClient = SocketClient(`http://localhost:${port}`);
        dextrose = new Client(socketClient);
        await expect(dextrose.waitForApp())
          .resolves.toBe(true)
          .then(resolve);
      });
    }));

  it('can load a component', () =>
    new Promise((resolve) => {
      io.on('connection', (socket) => {
        socket.on('loadComponent', (x) => {
          expect(x).toBe('component');
          io.emit('loaded');
        });
      });

      server.listen(0, async () => {
        const { port } = server.address();
        socketClient = SocketClient(`http://localhost:${port}`);
        dextrose = new Client(socketClient);
        expect(dextrose.loadComponent('component'))
          .resolves.toBe('component-loaded')
          .then(resolve);
      });
    }));

  it('returns a list of components loaded in the app', () =>
    new Promise((resolve) => {
      const componentList = ['a', 'b', 'c'];

      io.on('connection', (socket) => {
        socket.on('getAppComponents', () => {
          io.emit('bundled-components', componentList);
        });
      });

      server.listen(0, async () => {
        const { port } = server.address();
        socketClient = SocketClient(`http://localhost:${port}`);
        dextrose = new Client(socketClient);
        expect(dextrose.getLoadedComponents())
          .resolves.toMatchObject(componentList)
          .then(resolve);
      });
    }));
});
