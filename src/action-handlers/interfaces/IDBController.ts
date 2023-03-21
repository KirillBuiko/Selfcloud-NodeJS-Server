import {IUserDBController} from "@/action-handlers/interfaces/IUserDBController";
import {ITokenDBController} from "@/action-handlers/interfaces/ITokenDBController";
import {IVirtualDisksDBController} from "@/action-handlers/interfaces/IVirtualDisksDBController";

export interface IDBController {
    user: IUserDBController,
    token: ITokenDBController,
    virtualDisks: IVirtualDisksDBController
}