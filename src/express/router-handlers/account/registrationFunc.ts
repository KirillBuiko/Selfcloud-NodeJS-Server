import {Request, Response} from "express";
import ResultCode from "@/ResultCode";
import {UserHandler} from "@/typeorm/UserHandler";
import {RegData, ResponseObject} from "@/types/RequestTypes";

const userHandler = new UserHandler();

export const registrationFunc = async (req: Request, res: ResponseObject<ResponseObject<string>>) => {
    let user: RegData = req.body;

    const regRes = await userHandler.registration(user);
    if(regRes.code != ResultCode.OK) {
        res.json(regRes);
        return;
    }

    res.json({code: ResultCode.OK})
}
