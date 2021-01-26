import type { Self, User } from "@voxtl/types"
import type { Request } from "express"
import { BaseModel } from "./BaseModel"

export class UserModel extends BaseModel {
    //TODO
    new(): User {
        throw "unimplemented"
    }

    update(): User[] {
        throw "unimplemented"
    }

    delete(): void {
        throw "unimplemented"
    }

    all(): User[] {
        throw "unimplemented"
    }

    byID(req: Request): User {
        const isUUID = this._isUUID(req.params)

        throw "unimplemented"
    }

    bulk(): User[] {
        throw "unimplemented"
    }

    // Requires auth
    self(): Self {
        throw "unimplemented"
    }
}