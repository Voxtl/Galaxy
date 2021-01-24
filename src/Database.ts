import { Sequelize } from "sequelize"

export class Database {
    readonly uri: string
    public database: Sequelize

    constructor(uri: string) {
        this.uri = uri
        this.database = new Sequelize(this.uri)
    }

    async testConnection(): Promise<void> {
        try {
            await this.database.authenticate()
        } catch (error) {
            throw new Error("Could not connect to database")
        }
    }
}