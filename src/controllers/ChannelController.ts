import { Database } from "../Database"

export class ChannelController {
    private database: Database

    constructor(database: Database) {
        this.database = database
    }
}