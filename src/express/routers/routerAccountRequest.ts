import express, {Router} from "express";
import {Configs} from "@/ConfigFile";
import {ExpressAccountRequestHandlers} from "@/express/router-handlers/ExpressAccountRequestHandlers";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export function routerAccountRequest(dbController: IDBController): Router{
    const accReqRouter = express.Router();
    const exAccReqHandlers = new ExpressAccountRequestHandlers(dbController);

    accReqRouter.post(Configs.REQUEST_PREFIX + '/login_password',[
        // checkSchema({
        //     login: {
        //         exists: true,
        //         errorMessage: ResultCode.DATA_IS_INCOMPLETE
        //     }
        // } /*as {[key in keyof obj.LoginData]: ValidatorsSchema}*/),
        // (req, res,next)=>{
        // const errors = validationResult(req);
        //     if (!errors.isEmpty()) {
        //         return res.json({ code: errors.array()[0].msg});
        //     }
        //     next();
        //     },
        exAccReqHandlers.loginPassword.bind(exAccReqHandlers)])

    accReqRouter.post(Configs.REQUEST_PREFIX + '/login_token', [
        exAccReqHandlers.accessTokenCheck.bind(exAccReqHandlers)])

    accReqRouter.post(Configs.REQUEST_PREFIX + '/registration', [
        exAccReqHandlers.registration.bind(exAccReqHandlers)])

    accReqRouter.post(Configs.REQUEST_PREFIX + Configs.REFRESH_PATH, [
        exAccReqHandlers.refreshToken.bind(exAccReqHandlers)])

    accReqRouter.get(Configs.REQUEST_PREFIX + '/logout',
        exAccReqHandlers.logout.bind(exAccReqHandlers))

    return accReqRouter;
}