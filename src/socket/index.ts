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
        handlers.onConnect(socket);
        socket.on("disconnect", () => handlers.onDisconnect(socket))

        socket.on("get-virtual-disks", (...args) =>
            handlers.getVirtualDisks(socket, ...args));
        socket.on("provide-virtual-disks", (...args) =>
            handlers.provideVirtualDisks(socket, ...args));
        socket.on("revoke-virtual-disk", (...args) =>
            handlers.revokeVirtualDisk(socket, ...args));
        socket.on("create-virtual-disk", (...args) =>
            handlers.createVirtualDisk(socket, ...args));
        socket.on("remove-virtual-disk", (...args) =>
            handlers.removeVirtualDisk(socket, ...args));

        socket.on("connect-webrtc",(...args) =>
            handlers.connectWebRTC(socket, ...args));
        socket.on("connect-webrtc-answer", (...args) =>
            handlers.connectWebRTCAnswer(socket, ...args));
        socket.on("send-webrtc-candidate", (...args) =>
            handlers.sendWebRTCCandidate(socket, ...args));
    });

    return socket_http;
}