import { Request, Response } from "express"
import { UserModel } from "../models/UserModel"
import type { Self, User } from "@voxtl/types"

export class UserController {
    private user: UserModel

    constructor() {
        this.user = new UserModel
    }

    create(): User {
        throw "unimplemented"
    }

    update(): User {
        throw "unimplemented"
    }

    delete(): void {
        throw "unimplemented"
    }

    get(req: Request, res: Response): User {
        // Weird type errors I need to solve before doing this
        throw "unimplemented"
    }
    
    getBulk(): User[] {
        throw "unimplemented"
    }

    // Requires auth
    self(): Self {
        throw "unimplemented"
    }
}