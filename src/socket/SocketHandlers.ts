import {SCSocket, SCSocketServer} from "@/types/SocketTypes";
import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {VirtualDiskActions} from "@/action-handlers/VirtualDiskActions";

export class SocketHandlers{
    private actions;

    constructor(private io: SCSocketServer, private dbController: IDBController){
        this.actions = new VirtualDiskActions(dbController);
    };

    onConnect(socket: SCSocket){
        // TODO: make connect user to room
        const roomID = socket.data.uID;
        socket.join(roomID);
        this.io.to(roomID).emit("device-connected", socket.id);
    }

    connectWebRTC(targetID: string, offer: string){
        // TODO: make connect webrtc to other device
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-offer-received", socket.id, offer);
        }
    }

    connectWebRTCAnswer(targetID: string, answer: string){
        // TODO: make connect webrtc to other device
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-answer-received", socket.id, answer);
        }
    }

    getVirtualDisks(callback){
        callback(this.actions.getDeviceListAction());
        // TODO: make get device list
    }

    sendWebRTCCandidate(targetID: string, candidate: string){
        // TODO: make send webrtc candidate
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-candidate-received", socket.id, candidate);
        }
    }

    onDisconnect(){
        // TODO: make disconnect handler
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        this.io.to(roomID).emit("device-disconnected", socket.id);
    }
}