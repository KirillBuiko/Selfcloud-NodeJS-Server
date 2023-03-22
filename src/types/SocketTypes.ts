import {Server, Socket} from "socket.io";
import {VirtualDiskData} from "@/types/RequestTypes";

interface ListenEvents{
    "get-virtual-disks": (callback) => void,
    "provide-virtual-disks": (vds: VirtualDiskData[]) => void,
    "create-virtual-disk": (callback) => void,
    "remove-virtual-disk": (vdID: string) => void,
    "send-webrtc-candidate": (targetID: string, candidate: string) => void,
    "connect-webrtc": (targetID: string, offer: string) => void,
    "connect-webrtc-answer": (targetID: string, answer: string) => void
}

interface EmitEvents{
    "device-disconnected": (fingerprint: string) => void,
    "device-connected": (socketID, fingerprint) => void,
    "provide-virtual-disks": (socketID: string, fingerprint: string, vdIDs: string[]) => void,
    "create-virtual-disk": (vd: VirtualDiskData) => void,
    "remove-virtual-disk": (vdID: string) => void,
    "webrtc-offer-received": (sourceID, offer) => void,
    "webrtc-answer-received": (sourceID, answer) => void,
    "webrtc-candidate-received": (sourceID, candidate) => void
}

interface ServerEvents{

}

interface SocketData{
    uID: string,
    fingerprint: string
}

export type SCSocket = Socket<ListenEvents, EmitEvents, ServerEvents, SocketData>
export type SCSocketServer = Server<ListenEvents, EmitEvents, ServerEvents, SocketData>