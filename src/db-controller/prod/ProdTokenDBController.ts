import {ITokenDBController} from "@/action-handlers/interfaces/ITokenDBController";
import {AccessData, RefreshData, TokenInfo} from "@/types/RequestTypes";
import {AppDataSource} from "@/typeorm";
import {Token} from "@/typeorm/entities/Token";
import {Configs} from "@/ConfigFile";

export class ProdTokenDBController implements ITokenDBController{
    private tokenRepo = AppDataSource.getRepository(Token);

    constructor() {}

    async deleteToken(token: AccessData): Promise<void> {
        await this.tokenRepo.delete({access: token.access});
    }

    async getTokenInfo(token: AccessData | RefreshData): Promise<TokenInfo | null> {
        const tokenInfo = await this.tokenRepo.findOneBy({access: token.access});
        return tokenInfo != null ? {
            uID: tokenInfo.u_id,
            deadTime: tokenInfo.deadAt
        } : null;
    }

    async saveToken(uID: string, token: RefreshData): Promise<void> {
        console.error("SAVE: ////////////////////////", (await this.tokenRepo.save({
            u_id: uID,
            deadAt: (new Date()).getTime() + Configs.ACCESS_TOKEN_LIFETIME,
            refresh: token.refresh,
            access: token.access,
            fingerprint: token.fingerprint
        })).deadAt)
    }
}