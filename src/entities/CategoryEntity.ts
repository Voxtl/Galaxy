import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Channel } from "./ChannelEntity"
import { User } from "./UserEntity"

import type { v5 as uuid } from "uuid"
import type {
    Category as CategoryAttributes,
    Channel as ChannelAttributes
} from "@voxtl/types"

@Entity()
export class Category implements CategoryAttributes {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: typeof uuid

    @ManyToOne(() => User)
    author!: User

    @Column()
    name!: string

    @Column()
    visible!: boolean

    @ManyToMany(() => Channel, channel => channel.categories)
    channels!: ChannelAttributes[]

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}