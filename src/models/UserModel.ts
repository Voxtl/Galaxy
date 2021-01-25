import type { v5 as uuid } from "uuid"
import type { Self, User } from "@voxtl/types"

export class UserModel {
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

    byID(id: typeof uuid): User {
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