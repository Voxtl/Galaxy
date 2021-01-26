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

    byID(req: Request): User | undefined {
        if(!this._isUUID(req.params)) {
            return undefined
        }
    }

    bulk(): User[] {
        throw "unimplemented"
    }

    // Requires auth
    self(): Self {
        throw "unimplemented"
    }
}