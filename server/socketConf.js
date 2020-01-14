var socket_io = require('socket.io');
var io = socket_io();
var socketConf = {};

socketConf.io = io;

io.on('connection', function(socket) {
	console.log('A user connected');
});

socketConf.sendNotification = function() {
	io.sockets.emit('hello', { msg: 'Hello World!' });
};

module.exports = socketConf;
