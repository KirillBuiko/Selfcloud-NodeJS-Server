import {Server, Socket} from "socket.io";

interface ListenEvents{
    "get-virtual-disks": (callback) => void,
    "send-webrtc-candidate": (targetID, candidate) => void,
    "connect-webrtc": (targetID, offer) => void,
    "connect-webrtc-answer": (targetID, answer) => void
}

interface EmitEvents{
    "device-disconnected": (ID) => void,
    "device-connected": (ID) => void,
    "new-virtual-disk": (vd) => void,
    "virtual-disk-edit": (vd) => void,
    "webrtc-offer-received": (sourceID, offer) => void,
    "webrtc-answer-received": (sourceID, answer) => void,
    "webrtc-candidate-received": (sourceID, candidate) => void
}

interface ServerEvents{

}

interface SocketData{
    uID: string
}

export type SCSocket = Socket<ListenEvents, EmitEvents, ServerEvents, SocketData>
export type SCSocketServer = Server<ListenEvents, EmitEvents, ServerEvents, SocketData>