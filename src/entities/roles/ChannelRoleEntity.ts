import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import type { v5 as uuid } from "uuid"
import type {
    ChannelRole as ChannelRoleAttributes,
    Permissions,
    Viewer as ViewerAttributes
} from "@voxtl/types"
import { Viewer } from "../ViewerEntity"

@Entity()
export class ChannelRole implements ChannelRoleAttributes {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: typeof uuid

    @Column()
    permissions!: Permissions

    @ManyToMany(() => Viewer, viewer => viewer.roles)
    viewers!: ViewerAttributes[]

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}