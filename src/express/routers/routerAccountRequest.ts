import express, {Router} from "express";
import {Configs} from "@/ConfigFile";
import * as obj from "@/types/RequestTypes";
import {ExpressAccountRequestHandlers} from "@/express/router-handlers/ExpressAccountRequestHandlers";
import {ExpressGeneralHandlers} from "@/express/router-handlers/ExpressGeneralHandlers";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export function routerAccountRequest(dbController: IDBController): Router{
    const accountRequestRouter = express.Router();
    const expressGeneralHandlers = new ExpressGeneralHandlers();
    const expressAccountRequestHandlers = new ExpressAccountRequestHandlers(dbController);

    accountRequestRouter.post(Configs.REQUEST_PREFIX + '/login_password', [
        expressGeneralHandlers.typeCheckNext<obj.LoginData>(),
        expressAccountRequestHandlers.loginPassword])

    accountRequestRouter.post(Configs.REQUEST_PREFIX + '/login_token', [
        expressGeneralHandlers.typeCheckNext<obj.AccessData>(),
        expressAccountRequestHandlers.accessTokenCheck])

    accountRequestRouter.post(Configs.REQUEST_PREFIX + '/registration', [
        expressGeneralHandlers.typeCheckNext<obj.RegData>(),
        expressAccountRequestHandlers.registration])

    accountRequestRouter.post(Configs.REQUEST_PREFIX + Configs.REFRESH_PATH, [
        expressGeneralHandlers.typeCheckNext<obj.RefreshData>(),
        expressAccountRequestHandlers.refreshToken])

    accountRequestRouter.post(Configs.REQUEST_PREFIX + '/logout',
        expressAccountRequestHandlers.logout)

    return accountRequestRouter;
}