import {Repository} from "typeorm";
import {LoginData, RegData, ResultObject} from "@/Objects";
import {AppDataSource} from "@/typeorm/index";
import ResultCode from "@/ResultCode";
import {User} from "@/typeorm/entities/User";
import {PasswordHandler} from "@/typeorm/PasswordHandler";

export class UserHandler{
    userRepo: Repository<User>;
    passwordHandler: PasswordHandler

    constructor() {
        this.userRepo = AppDataSource.getRepository(User);
        this.passwordHandler = new PasswordHandler();
    }

    async login(data: LoginData): Promise<ResultObject<User>>{
        const user = await this.userRepo.findOneBy([{email: data.login}, {phone: data.login}]);
        if(user == null)
            return {code: ResultCode.WRONG_LOGIN_OR_PASSWORD}

        if((await this.passwordHandler.verifyPassword(user.u_id, data.password)).code == ResultCode.OK)
            return {code: ResultCode.OK, result: user}
        else
            return {code: ResultCode.WRONG_LOGIN_OR_PASSWORD}
    }

    async registration(user: RegData): Promise<ResultObject<string>>{
        // TODO: user fields validation, convert phone to format, password validation
        if((await this.userRepo.findOneBy([{phone: user.phone}, {email: user.email}])) != null)
            return {code: ResultCode.EMAIL_OR_PHONE_IS_BUSY};
        const saveUser = await this.userRepo.save(user);
        await this.passwordHandler.saveHash(saveUser.u_id, this.passwordHandler.createHash(user.password));
        return {code: ResultCode.OK}
    }
}
