import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./entities/User"
import {Token} from "@/typeorm/entities/Token";
import {PassHash} from "@/typeorm/entities/PassHash";
import {VirtualDisk} from "@/typeorm/entities/VirtualDisk";

export const AppDataSource = new DataSource({
    type :"sqlite",
    database: "tempDB.db",
    synchronize: true,
    logging: true,
    entities: [User, Token, PassHash, VirtualDisk],
    subscribers: [],
    migrations: [],
})