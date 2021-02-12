import { Database } from "../Database"

export class ProfileController {
    private database: Database

    //TODO: Implement controllers in try/catch 

    constructor(database: Database) {
        this.database = database
    }
}