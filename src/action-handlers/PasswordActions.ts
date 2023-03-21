import {ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import crypto from "crypto";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

interface PasswordHashObject{
    digest: string,
    hash: string,
    salt: string,
    keyLen: number,
    iter: number
}

export class PasswordActions {
    constructor(private dbController: IDBController) {}

    async verifyPassword(uID: string, password: string): Promise<ResponseObject<string>>{
        const hash = await this.dbController.user.getPasswordHash(uID);
        if(hash == null)
            return {code: ResultCode.FAIL}
        return this.verifyPasswordWithHash(hash, password)
    }

    async hashAndSave(uID, password, options?): Promise<ResponseObject<undefined>>{
        await this.saveHash(uID, this.createHash(password, options));
        return {code: ResultCode.OK};
    }

    private createHash(password, {
        iter = 10000,
        saltLen = 256,
        hashLen = 256,
        digest = 'sha512'
    }: {iter?: number, saltLen?: number, hashLen?: number, digest?: string} = {}): string {
        const salt = crypto.randomBytes(saltLen).toString('hex');
        const hashPass = crypto.pbkdf2Sync(password, salt, iter, hashLen, digest).toString('hex');
        const hashObject: PasswordHashObject = {
            digest: digest,
            hash: hashPass,
            salt: salt,
            keyLen: hashLen,
            iter: iter
        }
        return this.packHashObject(hashObject);
    }

    private async saveHash(uID: string, hash: string): Promise<ResponseObject<undefined>>{
        await this.dbController.user.savePasswordHash(uID, hash)
        return {code: ResultCode.OK};
    }

    private rehashPassword(password, hash): string{
        const hashObject: PasswordHashObject = this.unpackHashObject(hash);
        const computedPass = crypto.pbkdf2Sync(password, hashObject.salt, hashObject.iter,
            hashObject.keyLen, hashObject.digest).toString('hex');
        const computedHashObject: PasswordHashObject = hashObject;
        computedHashObject.hash = computedPass;
        return this.packHashObject(computedHashObject);
    }

    private verifyPasswordWithHash(hash: string, password: string): ResponseObject<string>{
        const calculatedHash = this.rehashPassword(password, hash);
        if(hash === calculatedHash)
            return {code: ResultCode.OK}
        else
            return {code: ResultCode.FAIL}
    }

    private unpackHashObject(hash: string): PasswordHashObject{
        return JSON.parse(Buffer.from(hash, 'base64').toString('ascii'));
    }

    private packHashObject(hashObject: PasswordHashObject): string{
        return Buffer.from(JSON.stringify(hashObject)).toString('base64');
    }
}