import {NextFunction, Request, Response} from "express";

export const cookieMigrationMiddle = ((req: Request, res: Response, next: NextFunction) => {
    const cookieTranslateFields = ['access', 'refresh', 'fingerprint'];
    cookieTranslateFields.forEach((field) => {
        if(req.cookies[field] !== undefined){
            req.body[field] = req.cookies[field];
        }
    })
    next()
})