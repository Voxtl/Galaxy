import { Request, Response } from "express"
import { AuthService } from "../auth/AuthService"
import { User } from "../entities/UserEntity"
import { getConnection, Repository } from "typeorm"
import { APIError } from "../error/APIError"
import type { User as UserAttributes } from "@voxtl/types"

export class UserController {
    #auth: AuthService
    userRepository: Repository<User>

    constructor() {
        this.#auth = new AuthService
        this.userRepository = getConnection().getRepository(User)
    }

    //TODO: Implement controllers in try/catch 
    create(req: Request, res: Response<UserAttributes>): void {
        throw "unimplemented"
    }

    update(req: Request<UserAttributes>, res: Response<UserAttributes>): void {
        const authed = req.headers.authorization ? 
            this.#auth.signIn(req.headers.authorization, req.params.id) 
            : undefined
    }

    delete(req: Request<UserAttributes>): void {
        const authed = req.headers.authorization ? 
            this.#auth.signIn(req.headers.authorization, req.params.id) 
            : undefined
    }

    async get(req: Request<UserAttributes>, res: Response<UserAttributes>): Promise<void> {
        try {
            const authed = req.headers.authorization ? 
                this.#auth.signIn(req.headers.authorization, req.params.id) 
                : undefined

            const user = await this.userRepository.findOne({ id: req.params.id })

            if(!user) {
                throw new APIError(404, "User does not exist.")
            }

            Reflect.deleteProperty(user, "password")
            Reflect.deleteProperty(user, "salt")

            if (!authed) {
                Reflect.deleteProperty(user, "stream_key")
            }

            res.status(200).send(user)
        } catch (error) {
            const code = error.code ? error.code : 500
            if (code === 500) error.message = "Internal Server Error." 
            res.status(code).send(error)
        } 
    }
    
    async all(req: Request, res: Response<UserAttributes[]>): Promise<void> {
        const user = await this.userRepository.find({
            cache: {
                id: "user_all",
                milliseconds: 120000
            }
        })
        //TODO: Seriously, reflect to delete authed props, good thing those dont exist yet.
        res.json(user)
    }
}