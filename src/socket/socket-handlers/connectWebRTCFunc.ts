import {SCSocket} from "@/types/SocketTypes";

function connectWebRTCHandler(){
    // TODO: make connect webrtc to other device
}

export const connectWebRTCFunc = (io, socket: SCSocket) => {
    socket.on("connect-webrtc", connectWebRTCHandler);
}