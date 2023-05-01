import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class VirtualDisk {
    @PrimaryGeneratedColumn("uuid")
    vd_id: string

    @Column()
    u_id: string

    @Column()
    fingerprint: string

    @Column()
    name: string

    @Column({
        default: false
    })
    isOnline: boolean
}