import {Request, Response} from "express";
import {RefreshData, ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {TokenHandler} from "@/typeorm/TokenHandler";
import {CookieTokenHandler} from "@/express/router-handlers/utils/cookieTokenHandler";

const tokenHandler = new TokenHandler()
const cookieHandler = new CookieTokenHandler()

export const refreshTokenFunc = async (req: Request, res: ResponseObject<ResponseObject<RefreshData>>) => {
    let token: RefreshData = req.body;

    const refreshTokenRes = await tokenHandler.refreshToken(token)
    if(refreshTokenRes.code != ResultCode.OK) {
        res.json({code: refreshTokenRes.code});
        return;
    }

    cookieHandler.setTokens(res, refreshTokenRes.result);
    res.json({code: ResultCode.OK, result: token as RefreshData})
}
