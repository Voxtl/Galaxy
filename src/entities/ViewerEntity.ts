import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./UserEntity"
import { Channel } from "./ChannelEntity"

import type { v5 as uuid } from "uuid"
import type {
    Viewer as ViewerAttributes,
    User as UserAttributes,
    Channel as ChannelAttributes,
    ChannelRole
} from "@voxtl/types"

@Entity()
export class Viewer implements ViewerAttributes {
    @PrimaryGeneratedColumn("uuid")
    id!: typeof uuid

    @ManyToOne(() => User, user => user.viewers)
    user!: UserAttributes
    
    @ManyToOne(() => Channel, channel => channel.viewers)
    channel!: ChannelAttributes

    @Column()
    role!: ChannelRole

    @Column()
    banned!: boolean

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}