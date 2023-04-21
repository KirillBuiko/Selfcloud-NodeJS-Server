import {Column, Entity, PrimaryColumn} from "typeorm"

@Entity()
export class VirtualDisk {
    @PrimaryColumn()
    vd_id: string

    @Column()
    fingerprint: string

    @Column({
        default: false
    })
    isOnline: string
}