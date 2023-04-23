import {IVirtualDisksDBController} from "@/action-handlers/interfaces/IVirtualDisksDBController";
import {VirtualDiskData} from "@/types/RequestTypes";
import {AppDataSource} from "@/typeorm";
import {VirtualDisk} from "@/typeorm/entities/VirtualDisk";
import {In} from "typeorm";

export class ProdVirtualDisksDBController implements IVirtualDisksDBController{
    private virtualDiskRepo = AppDataSource.getRepository(VirtualDisk);

    async getVirtualDisks(uID: string): Promise<VirtualDiskData[]> {
        const vds = await this.virtualDiskRepo.findBy({u_id: uID});
        return vds.map(vd => ({
            vdID: vd.vd_id,
            fingerprint: vd.fingerprint,
            isOnline: vd.isOnline
        }));
    }

    async addVirtualDisk(uID: string, fingerprint: string): Promise<VirtualDiskData>{
        const vd = await this.virtualDiskRepo.save({fingerprint});
        return {
            fingerprint: vd.fingerprint,
            isOnline: vd.isOnline,
            vdID: vd.vd_id
        }
    }

    async removeVirtualDisk(uID: string, vdID: string): Promise<void> {
        await this.virtualDiskRepo.delete({u_id: uID, vd_id: vdID});
    }

    async setOnlineVirtualDisks(uID: string, fingerprint: string, vdIDs: string[]): Promise<void> {
        await this.virtualDiskRepo.update({vd_id: In(vdIDs), u_id: uID}, {isOnline: true});
    }

    async setOfflineVirtualDisk(uID: string, vdID: string): Promise<void> {
        await this.virtualDiskRepo.update({vd_id: vdID, u_id: uID}, {isOnline: false});
    }

    async disconnectDevice(uID: string, fingerprint: string): Promise<void> {
        await this.virtualDiskRepo.update({fingerprint, u_id: uID}, {isOnline: false});
    }
}