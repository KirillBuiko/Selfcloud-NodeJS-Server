import {IUserDBController} from "@/action-handlers/interfaces/IUserDBController";
import {RegData} from "@/types/RequestTypes";
import {AppDataSource} from "@/typeorm";
import {User} from "@/typeorm/entities/User";
import {PassHash} from "@/typeorm/entities/PassHash";
import {Equal} from "typeorm";

export class ProdUserDBController implements IUserDBController {
    private userRepo = AppDataSource.getRepository(User);
    private passHashRepo = AppDataSource.getRepository(PassHash);

    constructor() {
    }

    async getPasswordHash(uID: string): Promise<string | null> {
        const hash = await this.passHashRepo.findOneBy({u_id: Equal(uID)})
        return hash != null ? hash.hash : null;
    }

    async getUserIDByEmailOrPhone(email: string, phone: string): Promise<string | null> {
        const user = await this.userRepo.findOneBy([{email: Equal(email)}, {phone: Equal(phone)}]);
        return user != null ? user.u_id : null;
    }

    async getUserIDByLogin(login: string): Promise<string | null> {
        const user = await this.userRepo.findOneBy([{email: Equal(login)}, {phone: Equal(login)}]);
        return user != null ? user.u_id : null;
    }

    async saveNewUser(regData: RegData): Promise<string | null> {
        const user = await this.userRepo.save(regData);
        return user.u_id;
    }

    async savePasswordHash(uID: string, hash: string): Promise<void> {
        await this.passHashRepo.save({u_id: uID, hash});
    }
}