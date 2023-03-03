import expr from '@/express';
import socket from '@/socket';
import {Configs} from '@/ConfigFile';
import {AppDataSource} from '@/typeorm';

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

(async function init() {
    await assertDatabaseConnectionOk();
    console.log(`Starting Sequelize + Express on port ${Configs.EXPRESS_PORT}...`);

    expr.listen(Configs.EXPRESS_PORT, () => {
        console.log(`Express server started on ${Configs.HOST}:${Configs.EXPRESS_PORT}.`);
    });
    socket.listen(Configs.SOCKET_PORT, () => {
        console.log(`Socket server started on port ${Configs.SOCKET_PORT}.`);
    });
})()