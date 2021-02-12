import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, Generated, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm"
import { Viewer } from "./ViewerEntity"
import { Profile } from "./ProfileEntity"
import { Channel } from "./ChannelEntity" 
import { GlobalRole } from "./roles/GlobalRoleEntity"

import type { v5 as uuid } from "uuid"
import type { 
    GlobalRole as GlobalRoleAttributes,
    Profile as ProfileAttributes,
    User as UserAttributes,
    Viewer as ViewerAttributes,
    Channel as ChannelAttributes
} from "@voxtl/types"

@Entity()
export class User implements UserAttributes {
    @PrimaryGeneratedColumn("uuid")
    id!: typeof uuid;

    @Column()
    username!: string

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    profile!: ProfileAttributes

    @OneToOne(() => Channel, channel => channel.user)
    @JoinColumn()
    channel!: ChannelAttributes

    @OneToMany(() => Viewer, viewer => viewer.user)
    viewers!: ViewerAttributes[]

    @Column()
    verified!: boolean

    @ManyToMany(() => GlobalRole, globalRole => globalRole.users)
    roles!: GlobalRoleAttributes[]

    @Generated("uuid")
    stream_key!: typeof uuid

    @CreateDateColumn()
    readonly created_at!: Date

    @UpdateDateColumn()
    readonly updated_at!: Date
}
