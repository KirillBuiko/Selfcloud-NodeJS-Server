import {Request, Response} from "express";
import {AccessData, ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
import {TokenHandler} from "@/typeorm/TokenHandler";

const tokenHandler = new TokenHandler()

export const accessTokenCheckNextFunc = async (req: Request, res: ResponseObject<ResponseObject<undefined>>, next) => {
    let token: AccessData = req.body;

    const checkTokenRes = await tokenHandler.checkToken(token)
    if(checkTokenRes.code != ResultCode.OK) {
        res.json({code: checkTokenRes.code});
        return;
    }

    next();
}
