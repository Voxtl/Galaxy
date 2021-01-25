import { Request, Response } from "express"
import { User } from "../models/User"

export class UserController {
    private user: User

    constructor() {
        this.user = new User
    }

    create() {
        throw "unimplemented"
    }

    update() {
        throw "unimplemented"
    }

    delete() {
        throw "unimplemented"
    }

    get(req: Request, res: Response) {
        // Weird type errors I need to solve before doing this
        throw "unimplemented"
    }
    
    getBulk() {
        throw "unimplemented"
    }
}