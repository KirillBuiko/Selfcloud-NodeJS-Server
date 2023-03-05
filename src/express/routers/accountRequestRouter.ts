import express from "express";
import {Configs} from "@/ConfigFile";
import * as obj from "@/types/RequestTypes";
import * as handler from "@/express/router-handlers";

export const accountRequestRouter = express.Router();

accountRequestRouter.post(Configs.REQUEST_PREFIX + '/login_password', [
    handler.typeCheckNextFunc<obj.LoginData>(),
    handler.loginPasswordFunc])

accountRequestRouter.post(Configs.REQUEST_PREFIX + '/login_token', [
    handler.typeCheckNextFunc<obj.AccessData>(),
    handler.accessTokenCheckNextFunc,
    handler.successFunc])

accountRequestRouter.post(Configs.REQUEST_PREFIX + '/registration', [
    handler.typeCheckNextFunc<obj.RegData>(),
    handler.registrationFunc])

accountRequestRouter.post(Configs.REQUEST_PREFIX + Configs.REFRESH_PATH, [
    handler.typeCheckNextFunc<obj.RefreshData>(),
    handler.refreshTokenFunc])

accountRequestRouter.post(Configs.REQUEST_PREFIX + '/logout', handler.logoutFunc)