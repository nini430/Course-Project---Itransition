"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioListen = (io) => {
    const connectedUsers = new Map();
    io.on('connection', (socket) => {
        const { userId } = socket.handshake.query;
        console.log(`Client is connected with id of ${userId}`);
        if (userId) {
            if (!connectedUsers.has(userId)) {
                connectedUsers.set(userId, socket);
            }
        }
        ;
        socket.on('add-comment', (newComment) => {
            socket.broadcast.emit('receive-comment', newComment);
        });
    });
};
exports.default = ioListen;
