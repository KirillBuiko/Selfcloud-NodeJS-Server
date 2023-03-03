import {Socket} from "socket.io";
import cookie from "cookie"

export const handshakeMiddle = (socket: Socket, next) => {
    const cookies = cookie.parse(socket.request.headers.cookie);
    // TODO: make handshake
    next()
}