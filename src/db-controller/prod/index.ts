import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {ProdUserDBController} from "@/db-controller/prod/ProdUserDBController";
import {ProdTokenDBController} from "@/db-controller/prod/ProdTokenDBController";
import {ProdVirtualDisksDBController} from "@/db-controller/prod/ProdVirtualDisksDBController";

export const prodDBController: IDBController = {
    token: new ProdTokenDBController(),
    user: new ProdUserDBController(),
    virtualDisks: new ProdVirtualDisksDBController()
}