import { DataTypes, Sequelize } from "sequelize"
import { ChannelModel } from "./models/ChannelModel"
import { ProfileModel } from "./models/ProfileModel"
import { UserModel } from "./models/UserModel"

export class Database {
    private _uri: string
    public database: Sequelize

    public users: typeof UserModel
    public profiles: typeof ProfileModel
    public channels: typeof ChannelModel

    constructor(uri: string) {
        this._uri = uri
        this.database = new Sequelize(this._uri)
        this.users = UserModel
        this.profiles = ProfileModel
        this.channels = ChannelModel
    }

    async createTables(): Promise<void> {
        const sequelize = this.database
        // Something tells me this'll be very long
        this.users.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    allowNull: false
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                verified: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                global_role: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                profile_id: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
                channel_id: {
                    type: DataTypes.UUID,
                    allowNull: false
                },
            },
            {
                tableName: "users",
                sequelize
            }        
        )
    }

    async testConnection(): Promise<void> {
        try {
            await this.database.authenticate()
        } catch (error) {
            throw new Error("Could not connect to database")
        }
    }
}