import { DataTypes, Sequelize } from "sequelize"
import { UserTable } from "./database/UserTable"

export class Database {
    private _uri: string
    public database: Sequelize
    public users: typeof UserTable

    constructor(uri: string) {
        this._uri = uri
        this.database = new Sequelize(this._uri)
        this.users = UserTable
    }

    async createTables(): Promise<void> {
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
                //todo fix this
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