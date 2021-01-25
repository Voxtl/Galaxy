import { UserModel } from "../models/UserModel"

export class IngestController {
    private user: UserModel

    constructor() {
        this.user = new UserModel()
    }
    
    publish(): void {
        throw "unimplemented"
    }

    end(): void {
        throw "unimplemented"
    }
}