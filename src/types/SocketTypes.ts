import {Server, Socket} from "socket.io";
import {VirtualDiskData} from "@/types/RequestTypes";

export interface ListenEvents{
    "get-virtual-disks": (callback: (vds: VirtualDiskData[]) => void) => void,
    "provide-virtual-disks": (vdIDs: string[]) => void,
    "revoke-virtual-disk": (vdID: string) => void,
    "create-virtual-disk": (callback: (vd: VirtualDiskData) => void) => void,
    "remove-virtual-disk": (vdID: string) => void,
    "send-webrtc-candidate": (fingerprint: string, candidate: string) => void,
    "connect-webrtc": (fingerprint: string, offer: string) => void,
    "connect-webrtc-answer": (fingerprint: string, answer: string) => void
}

interface EmitEvents{
    "device-disconnected": (fingerprint: string) => void,
    "device-connected": (fingerprint: string) => void,
    "provide-virtual-disks": (fingerprint: string, vdIDs: string[]) => void,
    "revoke-virtual-disk": (fingerprint: string, vdID: string) => void,
    "create-virtual-disk": (vd: VirtualDiskData) => void,
    "remove-virtual-disk": (vdID: string) => void,
    "webrtc-offer-received": (fingerprint: string, offer: string) => void,
    "webrtc-answer-received": (fingerprint: string, answer: string) => void,
    "webrtc-candidate-received": (fingerprint: string, candidate: string) => void
}

interface ServerEvents{

}

interface SocketData{
    uID: string,
    fingerprint: string
}

export type SCSocket = Socket<ListenEvents, EmitEvents, ServerEvents, SocketData>
export type SCSocketServer = Server<ListenEvents, EmitEvents, ServerEvents, SocketData>