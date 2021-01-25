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

    byID(id: string): User {
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