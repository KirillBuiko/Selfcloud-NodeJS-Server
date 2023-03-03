import {Socket} from "socket.io";
import {onDisconnectFunc} from "@/socket/socket-handlers/onDisconnectFunc";
import {connectToRoomFunc} from "@/socket/socket-handlers/connectToRoomFunc";

export const statusChangeRouter = (io, socket: Socket) => {
    connectToRoomFunc(io, socket);
    onDisconnectFunc(io, socket);
}