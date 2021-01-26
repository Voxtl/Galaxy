import { Request, Response } from "express"
import { UserModel } from "../models/UserModel"
import type { Self, User } from "@voxtl/types"

export class UserController {
    private user: UserModel

    constructor() {
        this.user = new UserModel
    }

    create(req: Request<User>, response: Response<User>): void {
        throw "unimplemented"
    }

    update(req: Request<User>, response: Response<User>): void {
        throw "unimplemented"
    }

    delete(req: Request): void {
        throw "unimplemented"
    }

    async get(req: Request, res: Response<User | string>): Promise<void> {
        // DB Logic first
        try {
            const user = await this.user.byID(req)

            res.json(user)
        } catch (error) {
            res.status(404).send("ID provided is not valid UUID.")
        }
    }
    
    getBulk(req: Request, res: Response<User[]>): void {
        throw "unimplemented"
    }

    // Requires auth
    self(req: Request, res: Response<Self>): void {
        throw "unimplemented"
    }
}