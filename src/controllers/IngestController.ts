import { Database } from "../Database"
import type { Request, Response } from "express"

export class IngestController {
    private database: Database

    //TODO: Implement controllers in try/catch 

    constructor(database: Database) {
        this.database = database
    }
    
    publish(req: Request, res: Response): void {
        throw "unimplemented"
    }

    end(req: Request, res: Response): void {
        throw "unimplemented"
    }
}