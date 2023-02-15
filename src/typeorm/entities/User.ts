import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    u_id: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column({
        default: "Jane"
    })
    name: string

    @Column({
        default: "Doe"
    })
    surname: string

    @Column({
        default: false
    })
    isVerified: boolean

    @CreateDateColumn()
    createdAt: string
}