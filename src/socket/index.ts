import http from "http";
import {Server, Socket} from 'socket.io'
import {handshakeMiddle} from "@/socket/middlewares/handshakeMiddle";
import {SCSocket, SCSocketServer} from "@/types/SocketTypes";
import * as handler from "@/socket/socket-handlers"

const socket_http = http.createServer();

const io: SCSocketServer = new Server(socket_http, {
    cors: {
        origin: "*"
    }
});

io.use(handshakeMiddle);
io.on('connection', (socket: SCSocket) => {
    handler.connectToRoomFunc(io, socket);
    handler.onDisconnectFunc(io, socket);

    handler.getDeviceListFunc(io, socket);

    handler.connectWebRTCFunc(io, socket);
    handler.sendWebRTCCandidateFunc(io, socket);
});

export default socket_http;