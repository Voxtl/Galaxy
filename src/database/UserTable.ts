import { Model } from "sequelize"
import type { GlobalRole, User as UserAttributes } from "@voxtl/types"
import type { v5 as uuid } from "uuid"

export class UserTable extends Model<UserAttributes> implements UserAttributes {
    public id!: typeof uuid
    public username!: string
    public profile!: {
        avatar: string | null,
        description: string | null,
        bio: string | null
    }
    public created!: Date
    public verified!: boolean
    public global_role!: GlobalRole
}