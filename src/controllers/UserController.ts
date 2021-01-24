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

    find(req, res) {
        if(res.locals.guest && (req.params.user === "@me")) {
            return res.status(401).send({"message": "You must be logged in to specify yourself."})
        }

        if(res.params.id) {
            return this.user.get(req.params.id)
        }
    }
    
    findAll() {
        throw "unimplemented"
    }
}