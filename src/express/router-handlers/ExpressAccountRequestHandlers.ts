import {NextFunction, Request, Response, Router} from "express";
import {ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {AccountActions} from "@/action-handlers/AccountActions"
import {CookieTokenHandler} from "@/express/router-handlers/CookieTokenHandler";
import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {Configs} from "@/ConfigFile";

export class ExpressAccountRequestHandlers {
    private readonly accountActionHandlers: AccountActions;
    private cookieTokenHandler: CookieTokenHandler;

    constructor(dbController: IDBController) {
        this.accountActionHandlers = new AccountActions(dbController);
        this.cookieTokenHandler = new CookieTokenHandler()
    }

    initAccountRouter(router: Router) {
        router.post(Configs.REQUEST_PREFIX + '/login_password', [
            this.loginPassword.bind(this)])

        router.post(Configs.REQUEST_PREFIX + '/login_token', [
            this.accessTokenCheck.bind(this)])

        router.post(Configs.REQUEST_PREFIX + '/registration', [
            this.registration.bind(this)])

        router.post(Configs.REQUEST_PREFIX + Configs.REFRESH_PATH, [
            this.refreshToken.bind(this)])

        router.get(Configs.REQUEST_PREFIX + '/logout',
            this.logout.bind(this))
    }

    async accessTokenCheck(req: Request, res: Response) {
        const response = await this.accountActionHandlers.accessTokenCheck(req.body);
        this.expressRequestResultHandler(response, res);
    }

    async accessTokenCheckNext(req: Request, res: Response, next: NextFunction) {
        const response = await this.accountActionHandlers.accessTokenCheck(req.body);
        this.expressRequestResultHandler(response, res, next);
    }

    async refreshToken(req: Request, res: Response) {
        const response = await this.accountActionHandlers.refreshToken(req.body);
        this.expressRequestResultHandler(response, res);
    }

    async loginPassword(req: Request, res: Response) {
        const response = await this.accountActionHandlers.loginPassword(req.body);
        if (response.code != ResultCode.OK) {
            res.json({code: response.code});
            return;
        }
        this.cookieTokenHandler.setTokens(response.result, res);
        res.json(response);
    }

    async registration(req: Request, res: Response) {
        const response = await this.accountActionHandlers.registration(req.body);
        this.expressRequestResultHandler(response, res);
    }

    async logout(req: Request, res: Response) {
        const response = await this.accountActionHandlers.logout(req.body);
        await this.expressRequestResultHandler(response, res);
    }

    private expressRequestResultHandler<T, R>(response: ResponseObject<T>, res: Response, next?: NextFunction) {
        console.log(response);
        if (response.code != ResultCode.OK) {
            res.json({code: response.code});
            return;
        }
        next ? next() : res.json(response)
    }
}