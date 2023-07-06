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
    }
    socket.on('send-message',(message:any)=>{
          if(connectedUsers.has(message.receiverId)) {
            socket.to(connectedUsers.get(message.receiverId).id).emit('receive-message',message);
          }
    })
    socket.on('disconnect',(reason:DisconnectReason)=>{
      connectedUsers.delete(userId);
    })
  });
};

export default ioListen;
