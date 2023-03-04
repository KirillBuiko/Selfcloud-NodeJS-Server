import {Repository} from "typeorm";
import {PassHash} from "@/typeorm/entities/PassHash";
import {ResultObject} from "@/types/RequestTypes";
import {AppDataSource} from "@/typeorm/index";
import ResultCode from "@/ResultCode";
import crypto from "crypto";

interface PasswordHashObject{
    digest: string,
    hashPass: string,
    salt: string,
    keyLen: number,
    iter: number
}

export class PasswordHandler{
    passRepo: Repository<PassHash>;

    constructor() {
        this.passRepo = AppDataSource.getRepository(PassHash);
    }

    createHash(password, iter=10000, saltLen=256, hashLen=256,
               digest='sha512'): string{
        const salt = crypto.randomBytes(saltLen).toString('hex');
        const hashPass = crypto.pbkdf2Sync(password, salt, iter, hashLen, digest).toString('hex');
        const hashObject: PasswordHashObject = {
            digest: digest,
            hashPass: hashPass,
            salt: salt,
            keyLen: hashLen,
            iter: iter
        }
        return Buffer.from(JSON.stringify(hashObject)).toString('base64');
    }

    async saveHash(u_id: string, hash: string): Promise<ResultObject<string>>{
        await this.passRepo.save({u_id: u_id, hash: hash})
        return {code: ResultCode.OK};
    }

    rehashPassword(password, hash): string{
        const hashObject: PasswordHashObject =
            JSON.parse(Buffer.from(hash, 'base64').toString('ascii'));
        const hashPass = crypto.pbkdf2Sync(password, hashObject.salt, hashObject.iter,
            hashObject.keyLen, hashObject.digest).toString('hex');
        const res: PasswordHashObject = hashObject;
        res.hashPass = hashPass;
        return Buffer.from(JSON.stringify(res)).toString('base64');
    }

    async verifyPassword(u_id: string, password: string): Promise<ResultObject<string>>{
        const res = await this.passRepo.findOneBy({u_id: u_id});
        if(res == null)
            return {code: ResultCode.FAIL}
        return this.verifyPasswordWithHash(res.hash, password)
    }

    verifyPasswordWithHash(hash: string, password: string): ResultObject<string>{
        const passwordHash = this.rehashPassword(password, hash);
        if(hash == passwordHash)
            return {code: ResultCode.OK}
        else
            return {code: ResultCode.FAIL}
    }
}