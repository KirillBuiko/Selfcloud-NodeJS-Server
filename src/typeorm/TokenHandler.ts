import {Token} from "@/typeorm/entities/Token";
import * as crypto from "crypto";
import {Configs} from "@/ConfigFile";
import {AppDataSource} from "@/typeorm/index";
import {Repository} from "typeorm";
import ResultCode from "@/ResultCode";
import {AccessData, RefreshData, ResultObject} from "@/Objects";

export class TokenHandler{
    tokenRepo: Repository<Token>;

    constructor() {
        this.tokenRepo = AppDataSource.getRepository(Token);
    }

    async checkAccessToken(token: AccessData): Promise<ResultObject<string>>{
        const tokenFind = await this.tokenRepo.findOneBy(token)
        if(tokenFind == null)
            return {code: ResultCode.TOKEN_INVALID};
        if (tokenFind.deadAt < (new Date()).getTime())
            return {code: ResultCode.TOKEN_EXPIRED, result: tokenFind.u_id};
        return {code: ResultCode.OK, result: tokenFind.u_id};
    }

    async checkRefreshToken(token: RefreshData): Promise<ResultObject<string>>{
        const tokenFind = await this.tokenRepo.findOneBy(token)
        if(tokenFind == null)
            return {code: ResultCode.TOKEN_INVALID};
        if(token.refresh != tokenFind.refresh)
            return {code: ResultCode.TOKEN_INVALID};
        if (tokenFind.deadAt < (new Date()).getTime())
            return {code: ResultCode.TOKEN_EXPIRED, result: tokenFind.u_id};
        return {code: ResultCode.OK, result: tokenFind.u_id};
    }

    async createToken(u_id: string, fingerprint?: string): Promise<RefreshData>{
        const token = new Token();
        token.u_id = u_id;
        if(fingerprint == undefined)
            token.fingerprint = this.createFingerprint();
        else
            token.fingerprint = fingerprint;
        token.access = this.createAccessToken();
        token.refresh = this.createRefreshToken();

        return this.tokenRepo.save(token);
    }

    createAccessToken(): string{
        return crypto.randomBytes(Configs.ACCESS_TOKEN_LENGTH).toString("base64");
    }

    createRefreshToken(){
        return crypto.randomBytes(Configs.REFRESH_TOKEN_LENGTH).toString("base64");
    }

    createFingerprint(){
        return crypto.randomBytes(Configs.FINGERPRINT_LENGTH).toString("base64");
    }

    async refreshToken(token: RefreshData): Promise<ResultObject<RefreshData>>{
        const res = await this.checkRefreshToken(token);
        if(res.code == ResultCode.OK || res.code == ResultCode.TOKEN_EXPIRED){
            const newToken = await this.createToken(res.result, token.fingerprint);
            return {code: ResultCode.OK, result: newToken};
        }
        else return {code: res.code};
    }

    async clearToken(token: AccessData): Promise<void>{
        const t = new Token()
        t.access = token.access;
        t.fingerprint = token.fingerprint;
        await this.tokenRepo.delete(token);
    }
}