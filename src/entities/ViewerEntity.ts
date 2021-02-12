import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./UserEntity"
import { Channel } from "./ChannelEntity"
import { ChannelRole } from "./roles/ChannelRoleEntity"

import type { v5 as uuid } from "uuid"
import type {
    Viewer as ViewerAttributes,
    User as UserAttributes,
    Channel as ChannelAttributes,
    ChannelRole as ChannelRoleAttributes
} from "@voxtl/types"

@Entity()
export class Viewer implements ViewerAttributes {
    @PrimaryGeneratedColumn("uuid")
    id!: typeof uuid

    @ManyToOne(() => User, user => user.viewers)
    user!: UserAttributes
    
    @ManyToOne(() => Channel, channel => channel.viewers)
    channel!: ChannelAttributes

    @ManyToMany(() => ChannelRole, channelRole => channelRole.viewers)
    roles!: ChannelRoleAttributes[]

    @Column()
    banned!: boolean

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}