import {TestTokenDBController} from "@/db-controller/test/TestTokenDBController";
import {TestUserDBController} from "@/db-controller/test/TestUserDBController";
import {IDBController} from "@/action-handlers/interfaces/IDBController";

export const testDBController: IDBController = {
    token: new TestTokenDBController(),
    user: new TestUserDBController()
}