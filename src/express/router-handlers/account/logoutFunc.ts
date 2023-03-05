import {Request, Response} from "express";
import {AccessData, ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {TokenHandler} from "@/typeorm/TokenHandler";
import {CookieTokenHandler} from "@/express/router-handlers/utils/cookieTokenHandler";

const tokenHandler = new TokenHandler()
const cookieHandler = new CookieTokenHandler()

export const logoutFunc = async (req: Request, res: ResponseObject<ResponseObject<string>>) => {
    try {
        let token: AccessData = req.body;
        await tokenHandler.clearToken(token)
    }
    catch (e) {}

    cookieHandler.clearTokenCookies(res);
    res.json({code: ResultCode.OK})
}
