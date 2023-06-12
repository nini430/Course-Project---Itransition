import {Server} from 'socket.io';

const ioListen=(io:InstanceType<typeof Server>)=>{
    io.on('connection',()=>{

    })
}

export default ioListen;