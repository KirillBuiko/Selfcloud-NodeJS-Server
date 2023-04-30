import {IVirtualDisksDBController} from "@/action-handlers/interfaces/IVirtualDisksDBController";
import {VirtualDiskData} from "@/types/RequestTypes";
import {AppDataSource} from "@/typeorm";
import {VirtualDisk} from "@/typeorm/entities/VirtualDisk";
import {Equal, In} from "typeorm";

export class ProdVirtualDisksDBController implements IVirtualDisksDBController {
    private virtualDiskRepo = AppDataSource.getRepository(VirtualDisk);

    async getVirtualDisks(uID: string): Promise<VirtualDiskData[]> {
        const vds = await this.virtualDiskRepo.findBy({u_id: Equal(uID)});
        return vds.map(vd => ({
            vdID: vd.vd_id,
            fingerprint: vd.fingerprint,
            name: vd.name,
            isOnline: vd.isOnline
        }));
    }

    async addVirtualDisk(uID: string, fingerprint: string, name: string): Promise<VirtualDiskData | null> {
        if (!uID || !fingerprint) return null;
        const vd = await this.virtualDiskRepo.save({u_id: uID, fingerprint, name});
        return {
            fingerprint: vd.fingerprint,
            isOnline: vd.isOnline,
            name: vd.name,
            vdID: vd.vd_id
        }
    }

    async removeVirtualDisk(uID: string, vdID: string): Promise<void> {
        await this.virtualDiskRepo.delete({u_id: Equal(uID), vd_id: Equal(vdID)});
    }

    async setOnlineVirtualDisks(uID: string, fingerprint: string, vdIDs: string[]): Promise<void> {
        await this.virtualDiskRepo.update({vd_id: In(vdIDs), u_id: Equal(uID)}, {isOnline: true});
    }

    async setOfflineVirtualDisk(uID: string, vdID: string): Promise<void> {
        await this.virtualDiskRepo.update({vd_id: Equal(vdID), u_id: Equal(uID)}, {isOnline: false});
    }

    async disconnectDevice(uID: string, fingerprint: string): Promise<void> {
        await this.virtualDiskRepo.update({fingerprint: Equal(fingerprint), u_id: Equal(uID)},
            {isOnline: false});
    }
}