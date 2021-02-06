import { Database } from "../Database"

export class ProfileController {
    private database: Database

    constructor(database: Database) {
        this.database = database
    }
}