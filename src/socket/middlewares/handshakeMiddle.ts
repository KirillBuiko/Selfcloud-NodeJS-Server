import cookie from "cookie"
import {SCSocket} from "@/types/SocketTypes";

export const handshakeMiddle = (socket: SCSocket, next) => {
    const cookies = cookie.parse(socket.request.headers.cookie);
    // TODO: make handshake
    socket.data.uID = "12345";
    console.log(cookies);
    next()
}