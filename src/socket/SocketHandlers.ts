import {SCSocket, SCSocketServer} from "@/types/SocketTypes";
import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {VirtualDiskActions} from "@/action-handlers/VirtualDiskActions";

export class SocketHandlers{
    private actions: VirtualDiskActions;

    constructor(private io: SCSocketServer, private dbController: IDBController){
        this.actions = new VirtualDiskActions(dbController);
    };

    onConnect(socket: SCSocket){
        // TODO: test
        const roomID = socket.data.uID;
        socket.join(roomID);
        socket.broadcast.to(roomID).emit("device-connected", socket.id, socket.data.fingerprint);
    }

    async onDisconnect(){
        // TODO: test
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        await this.actions.deviceDisconnect(socket.data.uID, socket.data.fingerprint);
        socket.broadcast.to(roomID).emit("device-disconnected", socket.data.fingerprint);
    }

    connectWebRTC(targetID: string, offer: string){
        // TODO: test
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-offer-received", socket.id, offer);
        }
    }

    connectWebRTCAnswer(targetID: string, answer: string){
        // TODO: test
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-answer-received", socket.id, answer);
        }
    }

    sendWebRTCCandidate(targetID: string, candidate: string){
        // TODO: test
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-candidate-received", socket.id, candidate);
        }
    }

    async getVirtualDisks(callback){
        // TODO: test
        const socket = this as unknown as SCSocket;
        callback(await this.actions.getVirtualDisks(socket.data.uID));
    }

    async provideVirtualDisks(vdIDs: string[]){
        // TODO: test
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        await this.actions.connectVirtualDisks(socket.data.uID, vdIDs);
        socket.broadcast.to(roomID).emit("provide-virtual-disks", socket.id, socket.data.fingerprint, vdIDs);
    }

    async createVirtualDisk(callback){
        // TODO: test
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        const vd = await this.actions.createVirtualDisk(socket.data.uID, socket.data.fingerprint, socket.id);
        socket.broadcast.to(roomID).emit("create-virtual-disk", vd);
        callback(vd);
    }

    async removeVirtualDisk(vdID: string){
        // TODO: test
        const socket = this as unknown as SCSocket;
        const roomID = socket.data.uID;
        await this.actions.removeVirtualDisk(socket.data.uID, vdID);
        socket.broadcast.to(roomID).emit("remove-virtual-disk", vdID);
    }
}