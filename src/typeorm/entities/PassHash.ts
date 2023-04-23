import {Column, Entity, PrimaryColumn} from "typeorm"

@Entity()
export class PassHash {
    @PrimaryColumn()
    u_id: string

    @Column()
    hash: string
}