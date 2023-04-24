import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import {cookieMigrationMiddle} from "@/express/middlewares/cookieMigrationMiddle"
import {routerAccountRequest} from "@/express/routers/routerAccountRequest";
import {Configs} from "@/Configs";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export default function getExpress(dbController: IDBController){
    const ex = express()

    ex.use(cors({
        origin: Configs.ORIGIN,
        optionsSuccessStatus: 200,
        credentials: true
    }))

// MIDDLEWARES
    ex.use(cookieParser())
    ex.use(express.json())
    ex.use(cookieMigrationMiddle)

// ROUTERS
    ex.use(routerAccountRequest(dbController));

    return ex;
}