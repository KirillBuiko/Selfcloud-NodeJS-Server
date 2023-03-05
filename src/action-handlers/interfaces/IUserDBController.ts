import {RegData} from "@/types/RequestTypes";

export interface IUserDBController{
    getPasswordHash(uID: string): Promise<string | null>,
    savePasswordHash(uID: string, hash: string): Promise<void>,
    saveNewUser(regData: RegData): Promise<string | null>
    getUserIDByEmailOrPhone(email: string, phone: string): Promise<string | null>,
    getUserIDByLogin(login: string): Promise<string | null>
}