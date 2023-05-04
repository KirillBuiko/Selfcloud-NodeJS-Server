import {SCSocket, SCSocketServer} from "@/types/SocketTypes";
import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {VirtualDiskActions} from "@/action-handlers/VirtualDiskActions";

export class SocketEventHandlers {
    private actions: VirtualDiskActions;

    constructor(private io: SCSocketServer, private dbController: IDBController) {
        this.actions = new VirtualDiskActions(dbController);
    };

    initSocketListeners(socket: SCSocket) {
        this.onConnect(socket);
        socket.onAny((eventName, ...args) => this.logOnAny(socket, eventName, args));
        socket.on("disconnect", () =>
            this.onDisconnect(socket))

        socket.on("get-virtual-disks", (...args) =>
            this.getVirtualDisks(socket, ...args));
        socket.on("provide-virtual-disks", (...args) =>
            this.provideVirtualDisks(socket, ...args));
        socket.on("revoke-virtual-disk", (...args) =>
            this.revokeVirtualDisk(socket, ...args));
        socket.on("create-virtual-disk", (...args) =>
            this.createVirtualDisk(socket, ...args));
        socket.on("remove-virtual-disk", (...args) =>
            this.removeVirtualDisk(socket, ...args));

        socket.on("connect-webrtc", (...args) =>
            this.connectWebRTC(socket, ...args));
        socket.on("connect-webrtc-answer", (...args) =>
            this.connectWebRTCAnswer(socket, ...args));
        socket.on("to-local-ice-candidate-ready", (...args) =>
            this.toLocalIceCandidateReady(socket, ...args));
        socket.on("to-remote-ice-candidate-ready", (...args) =>
            this.toRemoteIceCandidateReady(socket, ...args));
    }

    onConnect(socket: SCSocket) {
        // TODO: test
        const roomID = socket.data.uID;
        socket.join(roomID);
        socket.broadcast.to(roomID).emit("device-connected", socket.data.fingerprint);
    }

    async onDisconnect(socket: SCSocket) {
        // TODO: test
        const roomID = socket.data.uID;
        await this.actions.deviceDisconnect(socket.data.uID, socket.data.fingerprint);
        socket.broadcast.to(roomID).emit("device-disconnected", socket.data.fingerprint);
    }

    async connectWebRTC(socket: SCSocket, fingerprint: string, offer: string) {
        // TODO: test
        const roomID = socket.data.uID;
        const targetID = await this.getSocketIDByFingerprint(fingerprint, roomID);
        if (targetID != undefined) {
            this.io.sockets.sockets.get(targetID).emit("webrtc-offer-received", socket.data.fingerprint, offer);
        }
    }

    async connectWebRTCAnswer(socket: SCSocket, fingerprint: string, answer: string) {
        // TODO: test
        const roomID = socket.data.uID;
        const targetID = await this.getSocketIDByFingerprint(fingerprint, roomID);
        if (targetID != undefined) {
            this.io.sockets.sockets.get(targetID).emit("webrtc-answer-received", socket.data.fingerprint, answer);
        }
    }

    async toLocalIceCandidateReady(socket: SCSocket, fingerprint: string, candidate: RTCIceCandidate) {
        const roomID = socket.data.uID;
        const targetID = await this.getSocketIDByFingerprint(fingerprint, roomID);
        if (targetID != undefined)
            this.io.sockets.sockets.get(targetID).emit("to-local-ice-candidate-received", socket.data.fingerprint, candidate);
    }

    async toRemoteIceCandidateReady(socket: SCSocket, fingerprint: string, candidate: RTCIceCandidate) {
        const roomID = socket.data.uID;
        const targetID = await this.getSocketIDByFingerprint(fingerprint, roomID);
        if (targetID != undefined)
            this.io.sockets.sockets.get(targetID).emit("to-remote-ice-candidate-received", socket.data.fingerprint, candidate);
    }

    async getVirtualDisks(socket: SCSocket, callback) {
        // TODO: test
        callback(await this.actions.getVirtualDisks(socket.data.uID));
    }

    async provideVirtualDisks(socket: SCSocket, vdIDs: string[]) {
        // TODO: test
        const roomID = socket.data.uID;
        await this.actions.setOnlineVirtualDisks(socket.data.uID, socket.data.fingerprint, vdIDs);
        socket.broadcast.to(roomID).emit("provide-virtual-disks", socket.data.fingerprint, vdIDs);
    }

    async revokeVirtualDisk(socket: SCSocket, vdID: string) {
        // TODO: test
        const roomID = socket.data.uID;
        await this.actions.setOfflineVirtualDisk(socket.data.uID, vdID);
        socket.broadcast.to(roomID).emit("revoke-virtual-disk", socket.data.fingerprint, vdID);
    }

    async createVirtualDisk(socket: SCSocket, name: string, callback) {
        // TODO: test
        const roomID = socket.data.uID;
        const vd = await this.actions.createVirtualDisk(socket.data.uID, socket.data.fingerprint, name);
        if (vd)
            socket.broadcast.to(roomID).emit("create-virtual-disk", vd);
        callback(vd);
    }

    async removeVirtualDisk(socket: SCSocket, vdID: string) {
        // TODO: test
        const roomID = socket.data.uID;
        await this.actions.removeVirtualDisk(socket.data.uID, vdID);
        socket.broadcast.to(roomID).emit("remove-virtual-disk", vdID);
    }

    async getSocketIDByFingerprint(fingerprint: string, roomID: string): Promise<string | undefined> {
        const sockets = await this.io.in(roomID).fetchSockets();
        for (const socket of sockets) {
            if (socket.data.fingerprint === fingerprint)
                return socket.id;
        }
        return undefined;
    }

    logOnAny(socket: SCSocket, eventName, ...args) {
        console.warn(`EVENT "${eventName}" emitted by ${socket.data.fingerprint} with args:`);
        console.warn(args);
    }
}