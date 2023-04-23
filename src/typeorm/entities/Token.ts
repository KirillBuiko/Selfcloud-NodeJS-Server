import {Column, Entity, PrimaryColumn} from "typeorm"

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

    @Column()
    deadAt: number
}