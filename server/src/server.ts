import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import config from 'config'
import io from 'socket.io'

import app from './app'
import log from './utils/logger';
import ioListen from './sockets';

const PORT=config.get('port');
const NODE_ENV=config.get('nodeEnv');

const server=http.createServer(app);
const ioServer=new io.Server();
ioServer.attach(server,{cors:{origin:'*',methods:['GET','POST']}});

server.listen(PORT,()=>{
    ioListen(ioServer);
    log.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
})