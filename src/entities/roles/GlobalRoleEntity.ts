import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import type { v5 as uuid } from "uuid"
import type {
    GlobalRole as GlobalRoleAttributes,
    Permissions
} from "@voxtl/types"

@Entity()
export class GlobalRole implements GlobalRoleAttributes {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: typeof uuid

    @Column()
    permissions!: Permissions

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}