import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class PassHash {
    @PrimaryColumn()
    u_id: string

    @Column()
    hash: string
}