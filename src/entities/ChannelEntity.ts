import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./UserEntity"
import { Viewer } from "./ViewerEntity"
import { Category } from "./CategoryEntity"

import type { v5 as uuid } from "uuid"
import type {
    User as UserAttributes,
    Channel as ChannelAttributes,
    Viewer as ViewerAttributes,
    Category as CategoryAttributes
} from "@voxtl/types"

@Entity()
export class Channel implements ChannelAttributes {
    @PrimaryGeneratedColumn("uuid")
    id!: typeof uuid;

    @OneToOne(() => User, user => user.channel)
    user!: UserAttributes

    @ManyToMany(() => Category, category => category.channels)
    categories!: CategoryAttributes[]

    @OneToMany(() => Viewer, viewer => viewer.channel)
    viewers!: ViewerAttributes[]

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}
