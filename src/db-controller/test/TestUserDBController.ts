import {IUserDBController} from "@/action-handlers/interfaces/IUserDBController";
import {RegData} from "@/types/RequestTypes";

export class TestUserDBController implements IUserDBController{
    async getPasswordHash(uID: string): Promise<string | null> {
        return null;
    }

    async getUserIDByEmailOrPhone(email: string, phone: string): Promise<string | null> {
        return null;
    }

    async getUserIDByLogin(login: string): Promise<string | null> {
        return null;
    }

    async saveNewUser(regData: RegData): Promise<string | null> {
        return "";
    }

    async savePasswordHash(uID: string, hash: string): Promise<void> {
    }
}