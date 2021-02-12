import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "../UserEntity"

import type { v5 as uuid } from "uuid"
import type {
    GlobalRole as GlobalRoleAttributes,
    User as UserAttributes,
    Permissions
} from "@voxtl/types"

@Entity()
export class GlobalRole implements GlobalRoleAttributes {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: typeof uuid

    @Column()
    permissions!: Permissions

    @ManyToMany(() => User, user => user.roles)
    users!: UserAttributes[]

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}