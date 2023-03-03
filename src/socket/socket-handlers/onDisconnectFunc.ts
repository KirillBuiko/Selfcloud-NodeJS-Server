import {Socket} from "socket.io";

export const onDisconnectFunc = (io, socket: Socket) => {
    // TODO: make disconnect handler
    socket.on('disconnect', (reason) => {})
}