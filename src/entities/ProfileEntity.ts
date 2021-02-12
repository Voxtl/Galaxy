import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./UserEntity"

import type { v5 as uuid } from "uuid"
import type {
    Profile as ProfileAttributes,
    User as UserAttributes
} from "@voxtl/types"

@Entity()
export class Profile implements ProfileAttributes {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: typeof uuid;

    @OneToOne(() => User, user => user.profile)
    user!: UserAttributes

    @Column()
    avatar!: string

    @Column()
    description!: string

    @Column()
    bio!: string

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}
