import {ITokenDBController} from "@/action-handlers/interfaces/ITokenDBController";
import {AccessData, RefreshData, TokenInfo} from "@/types/RequestTypes";

export class ProdTokenDBController implements ITokenDBController{
    async deleteToken(token: AccessData): Promise<void> {
    }

    async getTokenInfo(token: AccessData | RefreshData): Promise<TokenInfo | null> {
        return {
            uID: "",
            deadTime: 0
        };
    }

    async saveToken(u_id: string, token: RefreshData): Promise<void> {
    }
}