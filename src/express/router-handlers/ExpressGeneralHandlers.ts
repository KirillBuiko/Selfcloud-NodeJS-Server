import {Request, Response} from "express";
import ResultCode from "@/ResultCode";

export class ExpressGeneralHandlers{
    constructor() {}

    typeCheckNext<T>(){
        return (req: Request, res: Response, next) => {
            try { let obj: T = req.body; }
            catch(err){ res.json({code: ResultCode.DATA_IS_INCOMPLETE}); return; }
            next();
        }
    }
}