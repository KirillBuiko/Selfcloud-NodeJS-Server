import {NextFunction, Request, Response} from "express";
import {ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {AccountActions} from "@/action-handlers/AccountActions"
import {CookieTokenHandler} from "@/express/router-handlers/CookieTokenHandler";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export class ExpressAccountRequestHandlers{
    private accountActionHandlers: AccountActions;
    private cookieTokenHandler: CookieTokenHandler;

    constructor(dbController: IDBController) {
        this.accountActionHandlers = new AccountActions(dbController);
        this.cookieTokenHandler = new CookieTokenHandler()
    }

    async accessTokenCheck(req: Request, res: Response){
        await this.expressHandlerWrapper(req, res,
            this.accountActionHandlers, this.accountActionHandlers.accessTokenCheck);
    }

    async accessTokenCheckNext(req: Request, res: Response, next: NextFunction){
        await this.expressHandlerWrapper(req, res,
            this.accountActionHandlers, this.accountActionHandlers.accessTokenCheck, true,
            () => {
                next();
            });
    }

    async refreshToken(req: Request, res: Response){
        await this.expressHandlerWrapper(req, res,
            this.accountActionHandlers, this.accountActionHandlers.refreshToken, false,
            (result) => {
                this.cookieTokenHandler.setTokens(result, res);
            });
    }

    async loginPassword(req: Request, res: Response){
        await this.expressHandlerWrapper(req, res,
            this.accountActionHandlers, this.accountActionHandlers.loginPassword, false,
            (result) => {
                this.cookieTokenHandler.setTokens(result, res);
            });
    }

    async registration(req: Request, res: Response){
        await this.expressHandlerWrapper(req, res, this.accountActionHandlers, this.accountActionHandlers.registration);
    }

    async logout(req: Request, res: Response){
        await this.expressHandlerWrapper(req, res,
            this.accountActionHandlers, this.accountActionHandlers.logout, false,
            () => {
                this.cookieTokenHandler.clearTokenCookies(res);
            });
    }

    private async expressHandlerWrapper<T, R>(req: Request, res: Response, classInst,
                                              fn: (object: R) => Promise<ResponseObject<T>>,
                                              hasNext: boolean = false,
                                              presendCallback?: (result: T) => any){
        const response = await (fn.bind(classInst)(req.body) as Promise<ResponseObject<T>>);
        console.log(response);
        if(response.code != ResultCode.OK) {
            res.json({code: response.code});
            return;
        }
        await presendCallback(response.result);
        if(!hasNext)
            res.json(response);
    }
}