import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import type { v5 as uuid } from "uuid"
import type {
    ChannelRole as ChannelRoleAttributes
} from "@voxtl/types"

@Entity()
export class ChannelRole implements ChannelRoleAttributes {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: typeof uuid

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}