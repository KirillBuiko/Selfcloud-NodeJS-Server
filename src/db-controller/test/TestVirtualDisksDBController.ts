import {IVirtualDisksDBController} from "@/action-handlers/interfaces/IVirtualDisksDBController";
import {VirtualDiskData} from "@/types/RequestTypes";

export class TestVirtualDisksDBController implements IVirtualDisksDBController{
    async getVirtualDisks(uID: string): Promise<VirtualDiskData[]> {
        return [];
    }

    addVirtualDisk(uID: string, vd: VirtualDiskData) {
    }

    removeVirtualDisk(uID: string, vdID: string) {
    }

    connectVirtualDisk(uID: string, vd: VirtualDiskData) {
    }

    disconnectDevice(uID: string, fingerprint: string) {
    }
}