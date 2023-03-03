import {Socket} from "socket.io";
import {getDeviceListFunc} from "@/socket/socket-handlers/getDeviceListFunc";

export const getInfoRouter = (io, socket: Socket) => {
    getDeviceListFunc(io, socket);
}