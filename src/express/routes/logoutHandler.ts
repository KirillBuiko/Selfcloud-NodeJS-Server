import {Request, Response} from "express";
import {AccessData, ResultObject} from "@/Objects";
import ResultCode from "@/ResultCode";
import {TokenHandler} from "@/typeorm/TokenHandler";
import {CookieHandler} from "@/express/CookieHandler";

const tokenHandler = new TokenHandler()
const cookieHandler = new CookieHandler()

export const logoutHandler = (async (req: Request, res: Response<ResultObject<string>>) => {
    let token: AccessData;
    try { token = req.body; }
    catch(err){ res.json({code: ResultCode.TOKEN_INVALID}) }

    await tokenHandler.clearToken(token)

    cookieHandler.clearTokenCookies(res);
    res.json({code: ResultCode.OK})
})