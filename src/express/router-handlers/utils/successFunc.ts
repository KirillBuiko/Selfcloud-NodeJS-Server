import {Request, Response} from "express";
import {ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";

export const successFunc  = (req: Request, res: ResponseObject<ResponseObject<undefined>>) => {
    res.json({code: ResultCode.OK});
}
