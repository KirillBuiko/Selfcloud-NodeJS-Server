import {Token} from "@/typeorm/entities/Token";
import * as crypto from "crypto";
import {Configs} from "@/ConfigFile";
import {AppDataSource} from "@/typeorm/index";
import {Repository} from "typeorm";
import ResultCode from "@/ResultCode";
import {AccessData, RefreshData, ResponseObject} from "@/types/RequestTypes";

export class TokenHandler{
    tokenRepo: Repository<Token>;

    constructor() {
        this.tokenRepo = AppDataSource.getRepository(Token);
    }


}