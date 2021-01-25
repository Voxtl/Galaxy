import { Sequelize } from "sequelize"

export class Database {
    private _uri: string
    public database: Sequelize

    constructor(uri: string) {
        this._uri = uri
        this.database = new Sequelize(this._uri)
    }

    async testConnection(): Promise<void> {
        try {
            await this.database.authenticate()
        } catch (error) {
            throw new Error("Could not connect to database")
        }
    }
}