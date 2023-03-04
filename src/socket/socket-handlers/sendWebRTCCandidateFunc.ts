import {SCSocket, SCSocketServer} from "@/types/SocketTypes";

function sendWebRTCCandidateHandler(){
    // TODO: make send webrtc candidate
}

export const sendWebRTCCandidateFunc = (io, socket: SCSocket) => {
    socket.on("send-webrtc-candidate", sendWebRTCCandidateHandler);
}