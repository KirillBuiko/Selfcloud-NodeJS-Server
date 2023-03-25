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
        socket.on("disconnect", handlers.onDisconnect)

        socket.on("get-virtual-disks", handlers.getVirtualDisks);
        socket.on("provide-virtual-disks", handlers.provideVirtualDisks);
        socket.on("revoke-virtual-disk", handlers.revokeVirtualDisk);
        socket.on("create-virtual-disk", handlers.createVirtualDisk);
        socket.on("remove-virtual-disk", handlers.removeVirtualDisk);

        socket.on("connect-webrtc", handlers.connectWebRTC);
        socket.on("connect-webrtc-answer", handlers.connectWebRTCAnswer);
        socket.on("send-webrtc-candidate", handlers.sendWebRTCCandidate);
    });

    return socket_http;
}