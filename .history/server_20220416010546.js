'use strict';

const net = require('net');
const {v4: uuidv4} = require('uuid');
const Networker = require('./src/networker');

let rooms = {};
let clients = [];
let server = net.createServer();

server.on('connection', (socket) => {
  console.log('A new client arrived');
  socket.id = uuidv4();

  let networker = new Networker(socket, (data) => {
    console.log('Received:', data.toString());
  });
  networker.init();
  clients.push({ socket, networker });
  networker.send('Hi traveller!');
  // networker.send('Hi traveller!');
// console.log("1");
  socket.on('end', () => {
    console.log('socket end');
  });
  socket.on('close', () => {
    console.log('socket close');
  });
//   console.log("2");
  socket.on('error', (e) => {
    console.log(e);
	console.log("error");
  });
});

server.on('error', (e) => {
  console.log(e);
});

// server.listen(8000);

server.listen(8010, ()=> { 
	console.log('server is listening');
  });