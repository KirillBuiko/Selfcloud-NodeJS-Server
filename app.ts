import expr from '@/express';
import socket from '@/socket';
import {Configs} from '@/ConfigFile';
import {AppDataSource} from '@/typeorm';
import {UserHandler} from "@/typeorm/UserHandler";
import {User} from "@/typeorm/entities/User";

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await AppDataSource.initialize();
        console.log("Database initialized")
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error);
        process.exit(1);
    }
}

async function accountTest() {
    const userHandler = new UserHandler();
    let user = new User();
    user.phone = "1231231213";
    user.email = "qweqwesqweqswe";

    /*let res = await userHandler.registration(user, "PASSWORD123123")
    if(res.code != ResultCode.OK){
        console.log(res.code)
        return;
    }*/

    let logRes = await userHandler.login('1231231213', 'PASSWORD12313');
    console.log(logRes);
    //console.log(passHandler.verifyPasswordWithHash(hash, password).code);
}

async function init() {
    await assertDatabaseConnectionOk();
    console.log(`Starting Sequelize + Express on port ${Configs.EXPRESS_PORT}...`);

    //await accountTest();

    expr.listen(Configs.EXPRESS_PORT, () => {
        console.log(`Express server started on ${Configs.HOST}:${Configs.EXPRESS_PORT}.`);
    });
    socket.listen(Configs.SOCKET_PORT, () => {
        console.log(`Socket server started on port ${Configs.SOCKET_PORT}.`);
    });
}

init();