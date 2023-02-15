import {Request, Response} from "express";
import ResultCode from "@/ResultCode";
import {UserHandler} from "@/typeorm/UserHandler";
import {RegData} from "@/Objects";

const userHandler = new UserHandler();

export const registrationHandler = async (req: Request, res: Response) => {
    let user: RegData;
    try { user = req.body; }
    catch(err){ res.json({code: ResultCode.DATA_IS_INCOMPLETE}) }

    const regRes = await userHandler.registration(user);
    if(regRes.code != ResultCode.OK)
        res.json(regRes)

    res.json({code: ResultCode.OK})
}