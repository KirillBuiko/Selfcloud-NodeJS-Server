import {VirtualDiskData} from "@/types/RequestTypes";

export interface IVirtualDisksDBController{
    getVirtualDisks(uID: string): Promise<VirtualDiskData[]>,
    addVirtualDisk(uID: string, vd: VirtualDiskData): Promise<void>,
    removeVirtualDisk(uID: string, vdID: string): Promise<void>,
    connectVirtualDisks(uID: string, vdIDs: string[]): Promise<void>,
    disconnectDevice(uID: string, fingerprint: string): Promise<void>,
}