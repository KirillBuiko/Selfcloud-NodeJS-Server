import {VirtualDiskData} from "@/types/RequestTypes";

export interface IVirtualDisksDBController{
    getVirtualDisks(uID: string): Promise<VirtualDiskData[]>,
    addVirtualDisk(uID: string, vd: VirtualDiskData): void,
    removeVirtualDisk(uID: string, vdID: string): void,
    connectVirtualDisk(uID: string, vd: VirtualDiskData): void,
    disconnectDevice(uID: string, fingerprint: string): void,
}