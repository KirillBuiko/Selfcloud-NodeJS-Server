import {AccessData, LoginData, RefreshData, RegData, ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {TokenActionHandler} from "@/action-handlers/TokenActionHandler";
import {PasswordActionHandler} from "@/action-handlers/PasswordActionHandler";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export class AccountActionHandlers{
    private tokenActionHandler: TokenActionHandler;
    private passwordActionHandler: PasswordActionHandler;

    constructor(private dbController: IDBController) {
        this.tokenActionHandler = new TokenActionHandler(dbController);
        this.passwordActionHandler = new PasswordActionHandler(dbController);
    }

    async loginPassword(loginData: LoginData): Promise<ResponseObject<RefreshData>>{
        const uID = await this.dbController.user.getUserIDByLogin(loginData.login);
        if((uID == null) ||
            ((await this.passwordActionHandler.verifyPassword(uID, loginData.password)).code != ResultCode.OK))
            return {code: ResultCode.WRONG_LOGIN_OR_PASSWORD}

        const token = await this.tokenActionHandler.createToken(uID, loginData.fingerprint)
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
        if(await this.dbController.user.getUserIDByEmailOrPhone(regData.email, regData.phone) != null)
            return {code: ResultCode.EMAIL_OR_PHONE_IS_BUSY}

        const uID = await this.dbController.user.saveNewUser(regData);
        await this.passwordActionHandler.hashAndSave(uID, regData.password);
        return {code: ResultCode.OK}
    }

    async accessTokenCheck(token: AccessData): Promise<ResponseObject<string>>{
        return await this.tokenActionHandler.checkToken(token);
    }
}