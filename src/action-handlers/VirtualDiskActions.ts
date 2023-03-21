import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {VirtualDiskData} from "@/types/RequestTypes";
import * as crypto from "crypto";

export class VirtualDiskActions{
    constructor(private dbController: IDBController) {}

    addVirtualDisk(uID: string, fingerprint: string, socketID: string): void{
        const vdID = crypto.randomUUID();
        this.dbController.virtualDisks.addVirtualDisk(uID, {
            vdID,
            fingerprint,
            isOnline: true,
            socketID: socketID
        })
    }

    deviceDisconnect(uID: string, fingerprint: string){
        this.dbController.virtualDisks.disconnectDevice(uID, fingerprint);
    }

    connectVirtualDisk(uID: string, vd: VirtualDiskData){
        this.dbController.virtualDisks.connectVirtualDisk(uID, vd);
    }

    async getVirtualDisks(uID: string): Promise<VirtualDiskData[]>{
        return await this.dbController.virtualDisks.getVirtualDisks(uID);
    }
}