import {ITokenDBController} from "@/action-handlers/interfaces/ITokenDBController";
import {AccessData, RefreshData, TokenInfo} from "@/types/RequestTypes";

export class TokenDBController implements ITokenDBController{
    async deleteToken(token: AccessData): Promise<void> {
        return Promise.resolve(undefined);
    }

    async getTokenInfo(token: AccessData | RefreshData): Promise<TokenInfo | null> {
        return Promise.resolve(undefined);
    }

    async saveToken(u_id: string, token: RefreshData): Promise<void> {
        return Promise.resolve(undefined);
    }
}