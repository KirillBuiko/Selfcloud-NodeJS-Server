import {Request, Response} from "express";
import {ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";
export const typeCheckNextFunc = <T>() => {
    return (req: Request, res: ResponseObject<ResponseObject<undefined>>, next) => {
        let obj: T;
        try { obj = req.body; }
        catch(err){ res.json({code: ResultCode.DATA_IS_INCOMPLETE}); return; }

        next();
    }
}
