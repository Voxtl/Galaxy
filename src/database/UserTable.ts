import { Model } from "sequelize"
import type { GlobalRole, _UserAttributes } from "@voxtl/types"
import type { v5 as uuid } from "uuid"

export class UserTable extends Model<_UserAttributes> implements _UserAttributes {
    public id!: typeof uuid
    public username!: string
    public created_at!: Date
    public verified!: boolean
    public global_role!: GlobalRole
    public profile_id!: typeof uuid
    public channel_id!: typeof uuid
}