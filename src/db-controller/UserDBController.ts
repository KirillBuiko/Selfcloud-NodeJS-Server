import {IUserDBController} from "@/action-handlers/interfaces/IUserDBController";
import {RegData} from "@/types/RequestTypes";

export class UserDBController implements IUserDBController{
    async getPasswordHash(uID: string): Promise<string | null> {
        return Promise.resolve(undefined);
    }

    async getUserIDByEmailOrPhone(email: string, phone: string): Promise<string | null> {
        return Promise.resolve(undefined);
    }

    async getUserIDByLogin(login: string): Promise<string | null> {
        return Promise.resolve(undefined);
    }

    async saveNewUser(regData: RegData): Promise<string | null> {
        return Promise.resolve(undefined);
    }

    async savePasswordHash(uID: string, hash: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}