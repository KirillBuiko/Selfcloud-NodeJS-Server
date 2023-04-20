import {VirtualDiskData} from "@/types/RequestTypes";

export interface IVirtualDisksDBController{
    getVirtualDisks(uID: string): Promise<VirtualDiskData[]>,
    addVirtualDisk(uID: string, vd: VirtualDiskData): Promise<void>,
    removeVirtualDisk(uID: string, vdID: string): Promise<void>,
    setOnlineVirtualDisks(uID: string, fingerprint: string, vdIDs: string[]): Promise<void>,
    setOfflineVirtualDisk(uID: string, vdID: string): Promise<void>,
    disconnectDevice(uID: string, fingerprint: string): Promise<void>,
}