import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import {cookieMigrationMiddle} from "@/express/middlewares/cookieMigrationMiddle"
import {accountRequestRouter} from "@/express/routers/accountRequestRouter";

const ex = express()

ex.use(cors({
    origin: 'http://localhost:8300',
    optionsSuccessStatus: 200,
    credentials: true
}))

// MIDDLEWARES
ex.use(cookieParser())
ex.use(express.json())
ex.use(cookieMigrationMiddle)

// ROUTERS
ex.use(accountRequestRouter);

export default ex;
