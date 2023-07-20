import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import io from 'socket.io'

import app from './app'
import ioListen from './sockets';
import './utils/cloudinaryConfig';
import './utils/dbConnect'

const PORT=process.env.PORT;
const NODE_ENV=process.env.NODE_ENV;

const server=http.createServer(app);
const ioServer=new io.Server();
ioServer.attach(server,{cors:{origin:'*',methods:['GET','POST']}});

server.listen(PORT,()=>{
    ioListen(ioServer);
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
})