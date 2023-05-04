import http from "http";
import {Server} from 'socket.io'
import {MiddlewareHandler} from "@/socket/middlewares/MiddlewareHandler";
import {SCSocket, SCSocketServer} from "@/types/SocketTypes";
import {SocketEventHandlers} from "@/socket/SocketEventHandlers";
import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {Configs} from "@/Configs";

export default function getSocket(dbController: IDBController) {
    const socket_http = http.createServer();
    const io: SCSocketServer = new Server(socket_http, {
        cors: {
            origin: Configs.ORIGIN,
            optionsSuccessStatus: 200,
            credentials: true
        }
    });
    const handlers = new SocketEventHandlers(io, dbController);
    new MiddlewareHandler(dbController).initServerMiddlewares(io);

    io.on('connection', (socket: SCSocket) => {
        handlers.initSocketListeners(socket);
    });

    return socket_http;
}