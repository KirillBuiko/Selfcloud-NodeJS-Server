import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "./entities/User"
import {Token} from "@/typeorm/entities/Token";
import {PassHash} from "@/typeorm/entities/PassHash";

export const AppDataSource = new DataSource({
    type :"sqlite",
    database: "tempDB.db",
    synchronize: true,
    logging: true,
    entities: [User, Token, PassHash],
    subscribers: [],
    migrations: [],
})