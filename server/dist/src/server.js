"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("config"));
const socket_io_1 = __importDefault(require("socket.io"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const sockets_1 = __importDefault(require("./sockets"));
const PORT = config_1.default.get('port');
const NODE_ENV = config_1.default.get('nodeEnv');
const server = http_1.default.createServer(app_1.default);
const ioServer = new socket_io_1.default.Server();
ioServer.attach(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
server.listen(PORT, () => {
    (0, sockets_1.default)(ioServer);
    logger_1.default.info(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
