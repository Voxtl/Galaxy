import { User } from "../models/User"

export class IngestController {
    private user: User

    constructor() {
        this.user = new User()
    }
    
    publish() {
        throw "unimplemented"
    }

    end() {
        throw "unimplemented"
    }
}