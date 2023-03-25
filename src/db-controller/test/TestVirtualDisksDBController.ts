import {IVirtualDisksDBController} from "@/action-handlers/interfaces/IVirtualDisksDBController";
import {VirtualDiskData} from "@/types/RequestTypes";

export class TestVirtualDisksDBController implements IVirtualDisksDBController{
    async getVirtualDisks(uID: string): Promise<VirtualDiskData[]> {
        return [];
    }

    async addVirtualDisk(uID: string, vd: VirtualDiskData): Promise<void>{
    }

    async removeVirtualDisk(uID: string, vdID: string): Promise<void> {
    }

    async setOnlineVirtualDisks(uID: string, socketID: string, fingerprint: string, vdIDs: string[]): Promise<void> {
    }

    async setOfflineVirtualDisk(uID: string, vdID: string): Promise<void> {
    }

    async disconnectDevice(uID: string, fingerprint: string): Promise<void> {
    }
}