import express, {Router} from "express";
import {ExpressAccountRequestHandlers} from "@/express/router-handlers/ExpressAccountRequestHandlers";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export function routerAccountRequest(dbController: IDBController): Router {
    const router = express.Router();
    (new ExpressAccountRequestHandlers(dbController)).initAccountRouter(router);
    return router;
}