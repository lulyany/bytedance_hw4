'use strict';

const net = require('net');
const {uuid} = require('uuidv4');
const Networker = require('./networker');

let rooms = {};
let clients = [];
let server = net.createServer();

server.on('connection', (socket) => {
  console.log('A new client arrived');
  socket.id = uuid();

  let networker = new Networker(socket, (data) => {
    console.log('Received:', data.toString());
  });
  networker.init();
  clients.push({ socket, networker });
  networker.send('Hi traveller!');
console.log("1");
  socket.on('end', () => {
    console.log('socket end');
  });
  socket.on('close', () => {
    console.log('socket close');
  });
  console.log("2");
  socket.on('error', (e) => {
    console.log(e);
  });
});

server.on('error', (e) => {
  console.log(e);
});

server.listen(8000);