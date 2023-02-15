import {Request, Response} from "express";
import {RefreshData, ResultObject} from "@/Objects";
import ResultCode from "@/ResultCode";
import {TokenHandler} from "@/typeorm/TokenHandler";
import {CookieHandler} from "@/express/CookieHandler";

const tokenHandler = new TokenHandler()
const cookieHandler = new CookieHandler()

export const refreshTokenHandler = async (req: Request, res: Response<ResultObject<RefreshData>>) => {
    let token: RefreshData;
    try { token = req.body; }
    catch(err){ res.json({code: ResultCode.TOKEN_INVALID}) }

    const refreshTokenRes = await tokenHandler.refreshToken(token)

    if(refreshTokenRes.code != ResultCode.OK)
        res.json({code: refreshTokenRes.code})

    cookieHandler.setTokens(res, refreshTokenRes.result);
    res.json({code: ResultCode.OK, result: token as RefreshData})
}