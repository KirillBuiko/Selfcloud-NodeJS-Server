import {AccessData, RefreshData, TokenInfo} from "@/types/RequestTypes";

export interface ITokenDBController{
    getTokenInfo(token: AccessData | RefreshData): Promise<TokenInfo | null>;
    saveToken(u_id: string, token: RefreshData): Promise<void>;
    deleteToken(token: AccessData): Promise<void>;
}