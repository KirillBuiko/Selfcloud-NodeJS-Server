import {Request, Response} from "express";
import {UserHandler} from "@/typeorm/UserHandler";
import {LoginData, RefreshData, ResponseObject} from "@/types/RequestTypes";
import ResultCode, {ResultCodeDescription} from "@/ResultCode";
import {TokenHandler} from "@/typeorm/TokenHandler";
import {CookieTokenHandler} from "@/express/router-handlers/utils/cookieTokenHandler";

const userHandler = new UserHandler()
const tokenHandler = new TokenHandler()
const cookieHandler = new CookieTokenHandler()

export const loginPasswordFunc = async (req: Request, res: ResponseObject<ResponseObject<RefreshData>>) => {
    let data: LoginData = req.body;

    const loginRes = await userHandler.login(data);
    if(loginRes.code != ResultCode.OK) {
        res.json({code: loginRes.code});
        return;
    }

    const token = await tokenHandler.createToken(loginRes.result.u_id, data.fingerprint)

    cookieHandler.setTokens(res, token);
    res.json({code: ResultCode.OK, result: token}, )
}
