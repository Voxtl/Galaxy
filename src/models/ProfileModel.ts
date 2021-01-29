import { Model } from "sequelize"
import type { _ProfileAttributes } from "@voxtl/types"
import type { v5 as uuid } from "uuid"

export class ProfileModel extends Model<_ProfileAttributes> implements _ProfileAttributes {
    public id!: typeof uuid
    public avatar!: string
    public bio!: string
    public description!: string

    public user_id!: typeof uuid
}