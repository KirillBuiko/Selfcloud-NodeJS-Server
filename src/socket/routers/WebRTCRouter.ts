import {Socket} from "socket.io";
import {connectWebRTCFunc} from "@/socket/socket-handlers/connectWebRTCFunc";
import {sendWebRTCCandidateFunc} from "@/socket/socket-handlers/sendWebRTCCandidateFunc";

export const WebRTCRouter = (io, socket: Socket) => {
    connectWebRTCFunc(io, socket);
    sendWebRTCCandidateFunc(io, socket);
}