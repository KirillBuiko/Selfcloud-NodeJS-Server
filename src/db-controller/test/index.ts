import {TestTokenDBController} from "@/db-controller/test/TestTokenDBController";
import {TestUserDBController} from "@/db-controller/test/TestUserDBController";
import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {TestVirtualDisksDBController} from "@/db-controller/test/TestVirtualDisksDBController";

export const testDBController: IDBController = {
    token: new TestTokenDBController(),
    user: new TestUserDBController(),
    virtualDisks: new TestVirtualDisksDBController()
}