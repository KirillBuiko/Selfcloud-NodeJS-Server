import {AccessData, LoginData, RefreshData, RegData, ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {TokenActionHandler} from "@/action-handlers/TokenActionHandler";
import {ITokenDBController} from "@/action-handlers/interfaces/ITokenDBController";
import {IUserDBController} from "@/action-handlers/interfaces/IUserDBController";
import {PasswordActionHandler} from "@/action-handlers/PasswordActionHandler";

export class accountActionHandler{
    tokenActionHandler: TokenActionHandler;
    passwordActionHandler: PasswordActionHandler;

    constructor(tokenDBController: ITokenDBController, private userDBController: IUserDBController) {
        this.tokenActionHandler = new TokenActionHandler(tokenDBController);
        this.passwordActionHandler = new PasswordActionHandler(userDBController);
    }

    async loginPassword(loginData: LoginData, fingerprint?: any): Promise<ResponseObject<RefreshData>>{
        const uID = await this.userDBController.getUserIDByLogin(loginData.login);
        if((uID == null) ||
            ((await this.passwordActionHandler.verifyPassword(uID, loginData.password)).code != ResultCode.OK))
            return {code: ResultCode.WRONG_LOGIN_OR_PASSWORD}

        const token = await this.tokenActionHandler.createToken(uID, fingerprint)
        return({code: ResultCode.OK, result: token})
    }

    async logout(token: AccessData): Promise<ResponseObject<undefined>>{
        await this.tokenActionHandler.clearToken(token);
        return({code: ResultCode.OK});
    }

    async refreshToken(token: RefreshData): Promise<ResponseObject<RefreshData>>{
        const refreshTokenRes = await this.tokenActionHandler.refreshToken(token)
        return(refreshTokenRes)
    }

    async registration(regData: RegData): Promise<ResponseObject<undefined>>{
        // TODO: user fields validation, convert phone to format, password validation
        if(await this.userDBController.getUserIDByEmailOrPhone(regData.email, regData.phone) != null)
            return {code: ResultCode.EMAIL_OR_PHONE_IS_BUSY}

        const uID = await this.userDBController.saveNewUser(regData);
        await this.passwordActionHandler.hashAndSave(uID, regData.password);
        return {code: ResultCode.OK}
    }

    async accessTokenCheck(token: AccessData): Promise<ResponseObject<string>>{
        return await this.tokenActionHandler.checkToken(token);
    }
}