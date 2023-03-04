import {DisconnectReason} from "socket.io";
import {SCSocket} from "@/types/SocketTypes";

function disconnectHandler(reason: DisconnectReason){
    console.log(reason);
    // TODO: make disconnect handler
}

export const onDisconnectFunc = (io, socket: SCSocket) => {
    socket.on("disconnect", disconnectHandler)
}