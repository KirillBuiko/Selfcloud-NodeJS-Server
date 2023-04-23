import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {VirtualDiskData} from "@/types/RequestTypes";

export class VirtualDiskActions{
    constructor(private dbController: IDBController) {}

    async createVirtualDisk(uID: string, fingerprint: string): Promise<VirtualDiskData>{
        return await this.dbController.virtualDisks.addVirtualDisk(uID, fingerprint);
    }

    async removeVirtualDisk(uID: string, vdID: string): Promise<void>{
        await this.dbController.virtualDisks.removeVirtualDisk(uID, vdID)
    }

    async deviceDisconnect(uID: string, fingerprint: string): Promise<void>{
        // disconnecting all VD from this socket
        await this.dbController.virtualDisks.disconnectDevice(uID, fingerprint);
    }

    async setOnlineVirtualDisks(uID: string, fingerprint: string, vdIDs: string[]): Promise<void>{
        await this.dbController.virtualDisks.setOnlineVirtualDisks(uID, fingerprint, vdIDs);
    }

    async setOfflineVirtualDisk(uID: string, vdID: string): Promise<void>{
        await this.dbController.virtualDisks.setOfflineVirtualDisk(uID, vdID);
    }

    async getVirtualDisks(uID: string): Promise<VirtualDiskData[]>{
        return this.dbController.virtualDisks.getVirtualDisks(uID);
    }
}