import {Column, Entity, PrimaryColumn} from "typeorm"
import {Configs} from "@/ConfigFile";

@Entity()
export class Token {
    @PrimaryColumn()
    u_id: string

    @PrimaryColumn()
    fingerprint: string

    @Column()
    access: string

    @Column()
    refresh: string

    @Column({
        type: "bigint",
        default: (new Date()).getTime() + Configs.ACCESS_TOKEN_LIFETIME
    })
    deadAt: number
}