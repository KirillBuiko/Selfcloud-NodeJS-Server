import http from "http";
import {Server} from 'socket.io'
import {handshakeMiddle} from "@/socket/middlewares/handshakeMiddle";
import {SCSocket, SCSocketServer} from "@/types/SocketTypes";
import {SocketHandlers} from "@/socket/SocketHandlers";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export default function getSocket(dbController: IDBController){
    const socket_http = http.createServer();
    const io: SCSocketServer = new Server(socket_http, {
        cors: {
            origin: "*"
        }
    });
    const handlers = new SocketHandlers(io, dbController);

    io.use(handshakeMiddle);
    io.on('connection', (socket: SCSocket) => {
        handlers.initSocketListeners(socket);
    });

    return socket_http;
}