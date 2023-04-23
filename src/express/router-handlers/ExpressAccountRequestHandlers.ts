import {NextFunction, Request, Response} from "express";
import {RefreshData, ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {AccountActions} from "@/action-handlers/AccountActions"
import {CookieTokenHandler} from "@/express/router-handlers/CookieTokenHandler";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export class ExpressAccountRequestHandlers {
    private readonly accountActionHandlers: AccountActions;
    private cookieTokenHandler: CookieTokenHandler;

    constructor(dbController: IDBController) {
        this.accountActionHandlers = new AccountActions(dbController);
        this.cookieTokenHandler = new CookieTokenHandler()
    }

    async accessTokenCheck(req: Request, res: Response) {
        await this.expressHandlerWrapper(req, res, this.accountActionHandlers.accessTokenCheck.bind(this.accountActionHandlers));
    }

    async accessTokenCheckNext(req: Request, res: Response, next: NextFunction) {
        await this.expressHandlerWrapper(req, res, this.accountActionHandlers.accessTokenCheck.bind(this.accountActionHandlers),
            true, () => {
                next();
            });
    }

    async refreshToken(req: Request, res: Response) {
        await this.expressHandlerWrapper(req, res, this.accountActionHandlers.refreshToken.bind(this.accountActionHandlers),
            false,(result: RefreshData) => {
                this.cookieTokenHandler.setTokens(result, res);
            });
    }

    async loginPassword(req: Request, res: Response) {
        await this.expressHandlerWrapper(req, res, this.accountActionHandlers.loginPassword.bind(this.accountActionHandlers),
            false,(result: RefreshData) => {
                this.cookieTokenHandler.setTokens(result, res);
            });
    }

    async registration(req: Request, res: Response) {
        await this.expressHandlerWrapper(req, res, this.accountActionHandlers.registration.bind(this.accountActionHandlers));
    }

    async logout(req: Request, res: Response) {
        await this.expressHandlerWrapper(req, res, this.accountActionHandlers.logout.bind(this.accountActionHandlers),
            false,() => {
                this.cookieTokenHandler.clearTokenCookies(res);
            });
    }

    private async expressHandlerWrapper<T, R>(req: Request, res: Response, fn: (object: R) => Promise<ResponseObject<T>>,
                                              hasNext: boolean = false,
                                              presendCallback?: (result: T) => any) {
        const response = await fn(req.body);
        console.log(response);
        if (response.code != ResultCode.OK) {
            res.json({code: response.code});
            return;
        }
        await presendCallback(response.result);
        if (!hasNext)
            res.json(response);
    }
}