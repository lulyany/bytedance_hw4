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
    name: 'content',
    message: "请输入你要发送的内容"
  }
]

let socket = net.createConnection({ port: 8010, host: 'localhost' });
socket.on('connect', () => {
  let networker = new Networker(socket, (data) => {
    networker.init();
    networker.send('Hi Server!');
    console.log('Received:', data.toString());
  });
  
  // networker.send('ABCDEFG');
  
  inquirer.prompt(questions).then(answers => {
    networker.send(` ${answers['name']}!`)
  }) 
});