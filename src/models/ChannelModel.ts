import { Model } from "sequelize"
import type { _ChannelAttributes } from "@voxtl/types"
import type { v5 as uuid } from "uuid"

export class ChannelModel extends Model<_ChannelAttributes> implements _ChannelAttributes {
    public id!: typeof uuid
    public banned_ids!: typeof uuid[]
    public moderator_ids!: typeof uuid[]
    public category_ids!: typeof uuid[]

    public user_id!: typeof uuid
}