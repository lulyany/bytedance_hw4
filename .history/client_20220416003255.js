'use strict';

const net = require('net');
const Networker = require('./networker');
// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })
const inquirer = require('inquirer')

var questions = [
  {
    type: 'input',
    name: 'name',
    message: "你叫什么名字?"
  }
]



let socket = net.createConnection({ port: 8010, host: 'localhost' });
socket.on('connect', () => {
  let networker = new Networker(socket, (data) => {
    console.log('Received:', data.toString());
  });
  networker.init();
  networker.send('Hi Server!');
  // networker.send('ABCDEFG'); 
});