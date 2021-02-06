import { Request, Response } from "express"
import { Database } from "../Database"
import type { BulkUser, Self, User } from "@voxtl/types"

export class UserController {
    private database: Database

    constructor(database: Database) {
        this.database = database
    }

    create(req: Request, res: Response<User>): void {
        throw "unimplemented"
    }

    update(req: Request, res: Response<User>): void {
        throw "unimplemented"
    }

    delete(req: Request): void {
        throw "unimplemented"
    }

    get(req: Request, res: Response<User | string>): Promise<void> {
        throw "unimplemented"
    }
    
    all(req: Request, res: Response<User[]>): void {
        throw "unimplemented"
    }

    getBulk(req: Request, res: Response<BulkUser[]>): void {
        throw "unimplemented"
    }

    // Requires auth
    self(req: Request, res: Response<Self>): void {
        throw "unimplemented"
    }
}