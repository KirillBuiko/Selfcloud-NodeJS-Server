import cookie from "cookie"
import {SCSocket, SCSocketServer} from "@/types/SocketTypes";
import {IDBController} from "@/action-handlers/interfaces/IDBController";
import {AccountActions} from "@/action-handlers/AccountActions";
import {AccessData, ResponseObject} from "@/types/RequestTypes";
import ResultCode from "@/ResultCode";

export class MiddlewareHandler{
    accountActions: AccountActions;

    constructor(private dbController: IDBController) {
        this.accountActions = new AccountActions(dbController);
    }

    initServerMiddlewares(io: SCSocketServer){
        io.use((socket, next) => this.handshakeMiddle(socket, next));
    }

    async handshakeMiddle(socket: SCSocket, next){
        if(!socket.request.headers.cookie) return;

        const cookies = cookie.parse(socket.request.headers.cookie) as unknown as AccessData;
        console.log(cookies);
        const response = await this.accountActions.accessTokenCheck({
            access: cookies.access,
            fingerprint: cookies.fingerprint
        });
        console.log(response)
        if(response.code != ResultCode.OK) {
            const err = new Error("NotAuthorized") as Error & {data: ResponseObject<string>};
            err.data = response;
            next(err);
            return;
        }
        socket.data.uID = response.result;
        socket.data.fingerprint = cookies.fingerprint;
        console.log(socket.data);
        next()
    }
}
