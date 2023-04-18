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

    async onDisconnect(socket: SCSocket){
        // TODO: test
        const roomID = socket.data.uID;
        await this.actions.deviceDisconnect(socket.data.uID, socket.data.fingerprint);
        socket.broadcast.to(roomID).emit("device-disconnected", socket.data.fingerprint);
    }

    connectWebRTC(socket: SCSocket, targetID: string, fingerprint: string, offer: string){
        // TODO: test
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-offer-received", socket.id, fingerprint, offer);
        }
    }

    connectWebRTCAnswer(socket: SCSocket, targetID: string, fingerprint: string, answer: string){
        // TODO: test
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-answer-received", socket.id, fingerprint, answer);
        }
    }

    sendWebRTCCandidate(socket: SCSocket, targetID: string, fingerprint: string, candidate: string){
        const roomID = socket.data.uID;
        if(this.io.sockets.adapter.rooms.get(roomID).has(targetID)){
            this.io.sockets.sockets.get(targetID).emit("webrtc-candidate-received", socket.id, fingerprint, candidate);
        }
    }

    async getVirtualDisks(socket: SCSocket, callback){
        // TODO: test
        callback(await this.actions.getVirtualDisks(socket.data.uID));
    }

    async provideVirtualDisks(socket: SCSocket, vdIDs: string[]){
        // TODO: test
        const roomID = socket.data.uID;
        await this.actions.setOnlineVirtualDisks(socket.data.uID, socket.id, socket.data.fingerprint, vdIDs);
        socket.broadcast.to(roomID).emit("provide-virtual-disks", socket.id, socket.data.fingerprint, vdIDs);
    }

    async revokeVirtualDisk(socket: SCSocket, vdID: string){
        // TODO: test
        const roomID = socket.data.uID;
        await this.actions.setOfflineVirtualDisk(socket.data.uID, vdID);
        socket.broadcast.to(roomID).emit("revoke-virtual-disk", socket.data.fingerprint, vdID);
    }

    async createVirtualDisk(socket: SCSocket, callback){
        // TODO: test
        const roomID = socket.data.uID;
        const vd = await this.actions.createVirtualDisk(socket.data.uID, socket.data.fingerprint, socket.id);
        socket.broadcast.to(roomID).emit("create-virtual-disk", vd);
        callback(vd);
    }

    async removeVirtualDisk(socket: SCSocket, vdID: string){
        // TODO: test
        const roomID = socket.data.uID;
        await this.actions.removeVirtualDisk(socket.data.uID, vdID);
        socket.broadcast.to(roomID).emit("remove-virtual-disk", vdID);
    }
}