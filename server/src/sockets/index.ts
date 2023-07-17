import { Comment } from '@prisma/client';
import { Server, DisconnectReason } from 'socket.io';

const ioListen = (io: InstanceType<typeof Server>) => {
  const connectedUsers = new Map();
  io.on('connection', (socket) => {
    const {userId}=socket.handshake.query;
    console.log(`Client is connected with id of ${userId}`);
    if(userId) {
      if(!connectedUsers.has(userId)) {
        connectedUsers.set(userId,socket);
      }
    };

    socket.on('add-comment',(newComment:Comment)=>{
        socket.broadcast.emit('receive-comment',newComment);
    })
  });
};

export default ioListen;
