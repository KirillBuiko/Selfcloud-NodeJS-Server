import {Request, Response} from "express";
import {UserHandler} from "@/typeorm/UserHandler";
import {LoginData, RefreshData, ResultObject} from "@/Objects";
import ResultCode from "@/ResultCode";
import {TokenHandler} from "@/typeorm/TokenHandler";
import {CookieHandler} from "@/express/CookieHandler";

const userHandler = new UserHandler()
const tokenHandler = new TokenHandler()
const cookieHandler = new CookieHandler()

export const loginHandler = (async (req: Request, res: Response<ResultObject<RefreshData>>) => {
    let data: LoginData;
    try { data = req.body; }
    catch(err){ res.json({code: ResultCode.DATA_IS_INCOMPLETE}) }

    const loginRes = await userHandler.login(data);

    if(loginRes.code != ResultCode.OK)
        res.json({code: loginRes.code})

    const token = await tokenHandler.createToken(loginRes.result.u_id, data.fingerprint)

    cookieHandler.setTokens(res, token);
    res.json({code: ResultCode.OK, result: token})
})