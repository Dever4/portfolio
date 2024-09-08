const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// Handle chat connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message); // Send message to all users
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});