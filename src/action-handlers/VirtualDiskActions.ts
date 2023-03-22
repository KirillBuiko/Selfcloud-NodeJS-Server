import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {VirtualDiskData} from "@/types/RequestTypes";
import * as crypto from "crypto";

export class VirtualDiskActions{
    constructor(private dbController: IDBController) {}

    async createVirtualDisk(uID: string, fingerprint: string, socketID: string): Promise<VirtualDiskData>{
        const vdID = crypto.randomUUID();
        const vd: VirtualDiskData = {
            vdID,
            fingerprint,
            isOnline: false,
            socketID: socketID
        }
        await this.dbController.virtualDisks.addVirtualDisk(uID, vd)
        return vd;
    }

    async removeVirtualDisk(uID: string, vdID: string): Promise<void>{
        await this.dbController.virtualDisks.removeVirtualDisk(uID, vdID)
    }

    async deviceDisconnect(uID: string, fingerprint: string): Promise<void>{
        // disconnecting all VD from this socket
        await this.dbController.virtualDisks.disconnectDevice(uID, fingerprint);
    }

    async connectVirtualDisks(uID: string, vdIDs: string[]): Promise<void>{
        await this.dbController.virtualDisks.connectVirtualDisks(uID, vdIDs);
    }

    async getVirtualDisks(uID: string): Promise<VirtualDiskData[]>{
        return this.dbController.virtualDisks.getVirtualDisks(uID);
    }
}