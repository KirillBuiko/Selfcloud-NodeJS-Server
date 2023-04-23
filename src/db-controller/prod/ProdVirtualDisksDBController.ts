import {IVirtualDisksDBController} from "@/action-handlers/interfaces/IVirtualDisksDBController";
import {VirtualDiskData} from "@/types/RequestTypes";
import {AppDataSource} from "@/typeorm";
import {VirtualDisk} from "@/typeorm/entities/VirtualDisk";
import {In} from "typeorm";

export class ProdVirtualDisksDBController implements IVirtualDisksDBController {
    private virtualDiskRepo = AppDataSource.getRepository(VirtualDisk);

    async getVirtualDisks(uID: string): Promise<VirtualDiskData[]> {
        if (!uID) return [];
        const vds = await this.virtualDiskRepo.findBy({u_id: uID});
        return vds.map(vd => ({
            vdID: vd.vd_id,
            fingerprint: vd.fingerprint,
            isOnline: vd.isOnline
        }));
    }

    async addVirtualDisk(uID: string, fingerprint: string): Promise<VirtualDiskData | null> {
        if (!uID || !fingerprint) return null;
        const vd = await this.virtualDiskRepo.save({u_id: uID, fingerprint});
        return {
            fingerprint: vd.fingerprint,
            isOnline: vd.isOnline,
            vdID: vd.vd_id
        }
    }

    async removeVirtualDisk(uID: string, vdID: string): Promise<void> {
        if (!uID || !vdID) return;
        await this.virtualDiskRepo.delete({u_id: uID, vd_id: vdID});
    }

    async setOnlineVirtualDisks(uID: string, fingerprint: string, vdIDs: string[]): Promise<void> {
        if (!uID || !vdIDs || vdIDs.length == 0) return;
        await this.virtualDiskRepo.update({vd_id: In(vdIDs), u_id: uID}, {isOnline: true});
    }

    async setOfflineVirtualDisk(uID: string, vdID: string): Promise<void> {
        if (!uID || !vdID) return;
        await this.virtualDiskRepo.update({vd_id: vdID, u_id: uID}, {isOnline: false});
    }

    async disconnectDevice(uID: string, fingerprint: string): Promise<void> {
        if (!uID || !fingerprint) return;
        await this.virtualDiskRepo.update({fingerprint, u_id: uID}, {isOnline: false});
    }
}