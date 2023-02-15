import {CookieOptions, Response} from "express";
import {Configs} from "@/ConfigFile";
import {RefreshData} from "@/Objects";

export class CookieHandler{
    setTokens(res: Response, tokens: RefreshData){
        for(let token in tokens){
            const options: CookieOptions = {
                httpOnly:true,
                secure: true
            };
            if(token == 'refresh') options.path = Configs.REQUEST_PREFIX + '/refresh'
            res.cookie(token, tokens[token], options)
        }
    }

    clearTokenCookies(res){
        for(let token in ['access', 'refresh']){
            const options: CookieOptions = {
                httpOnly:true,
                secure: true,
                expires: new Date(0)
            };
            if(token == 'refresh') options.path = Configs.REQUEST_PREFIX + '/refresh'
            res.cookie(token, "", options)
        }
    }
}