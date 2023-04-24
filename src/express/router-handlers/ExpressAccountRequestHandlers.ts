import {NextFunction, Request, Response, Router} from "express";
import {ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {AccountActions} from "@/action-handlers/AccountActions"
import {CookieTokenHandler} from "@/express/router-handlers/CookieTokenHandler";
import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {Configs} from "@/Configs";

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
        this.expressRequestResultHandler(response, res, null, next);
    }

    async refreshToken(req: Request, res: Response) {
        const response = await this.accountActionHandlers.refreshToken(req.body);
        this.expressRequestResultHandler(response, res, (result) => {
            this.cookieTokenHandler.setTokens(result, res);
        });
    }

    async loginPassword(req: Request, res: Response) {
        const response = await this.accountActionHandlers.loginPassword(req.body);
        this.expressRequestResultHandler(response, res, (result) => {
            this.cookieTokenHandler.setTokens(result, res);
        });
    }

    async registration(req: Request, res: Response) {
        const response = await this.accountActionHandlers.registration(req.body);
        this.expressRequestResultHandler(response, res);
    }

    async logout(req: Request, res: Response) {
        const response = await this.accountActionHandlers.logout(req.body);
        this.expressRequestResultHandler(response, res, () => {
            this.cookieTokenHandler.clearTokenCookies(res);
        });
    }

    private expressRequestResultHandler<T, R>(response: ResponseObject<T>, res: Response,
                                              preSendCallback?: (result: T) => void, next?: NextFunction) {
        if (response.code != ResultCode.OK) {
            res.json({code: response.code});
            return;
        }
        if (preSendCallback)
            preSendCallback(response.result);
        next ? next() : res.json(response);
    }
}