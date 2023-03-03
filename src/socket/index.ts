import http from "http";
import {Server} from 'socket.io'
import {handshakeMiddle} from "@/socket/middlewares/handshakeMiddle";
import {WebRTCRouter} from "@/socket/routers/WebRTCRouter";
import {getInfoRouter} from "@/socket/routers/getInfoRouter";
import {statusChangeRouter} from "@/socket/routers/statusChangeRouter";

const socket_http = http.createServer();

const io = new Server(socket_http, {
    cors: {
        origin: "*"
    }
});

io.use(handshakeMiddle);
io.on('connection', (socket) => {
    statusChangeRouter(io, socket);
    getInfoRouter(io, socket);
    WebRTCRouter(io, socket);
});

export default socket_http;