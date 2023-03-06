import {IUserDBController} from "@/action-handlers/interfaces/IUserDBController";
import {ITokenDBController} from "@/action-handlers/interfaces/ITokenDBController";

export interface IDBController {
    user: IUserDBController,
    token: ITokenDBController
}