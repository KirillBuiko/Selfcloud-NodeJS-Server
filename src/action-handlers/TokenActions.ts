import {AccessData, RefreshData, ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import crypto from "crypto";
import {Configs} from "@/Configs";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export class TokenActions {
    constructor(private dbController: IDBController) {
    }

    async checkToken(token: AccessData | RefreshData): Promise<ResponseObject<string>> {
        console.log(token);
        const info = await this.dbController.token.getTokenInfo(token)
        console.log(info);
        if (info == null)
            return {code: ResultCode.TOKEN_INVALID};
        if (info.deadTime < (new Date()).getTime())
            return {code: ResultCode.TOKEN_EXPIRED, result: info.uID};
        return {code: ResultCode.OK, result: info.uID};
    }

    async createToken(uID: string, fingerprint?: string): Promise<RefreshData> {
        const token: RefreshData = {
            fingerprint: (fingerprint ?? this.createFingerprint()),
            access: this.createAccessToken(),
            refresh: this.createRefreshToken(),
        };

        await this.dbController.token.saveToken(uID, token);
        return token;
    }

    createAccessToken(): string {
        return crypto.randomBytes(Configs.ACCESS_TOKEN_LENGTH).toString("base64");
    }

    createRefreshToken() {
        return crypto.randomBytes(Configs.REFRESH_TOKEN_LENGTH).toString("base64");
    }

    createFingerprint() {
        return crypto.randomBytes(Configs.FINGERPRINT_LENGTH).toString("base64");
    }

    async refreshToken(token: RefreshData): Promise<ResponseObject<RefreshData>> {
        const res = await this.checkToken(token);
        if (res.code == ResultCode.OK || res.code == ResultCode.TOKEN_EXPIRED) {
            const newToken = await this.createToken(res.result, token.fingerprint);
            return {code: ResultCode.OK, result: newToken};
        } else return {code: res.code};
    }

    async clearToken(token: AccessData): Promise<void> {
        await this.dbController.token.deleteToken(token);
    }
}