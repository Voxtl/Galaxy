import { Request, Response } from "express"
import { AuthService } from "../auth/AuthService"
import { User } from "../entities/UserEntity"
import { Connection, getConnection } from "typeorm"
import type { User as UserAttributes } from "@voxtl/types"

export class UserController {
    #auth: AuthService
    connection: Connection

    constructor() {
        this.#auth = new AuthService
        this.connection = getConnection()
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

            const user = await this.connection.manager.findOne(User, { id: req.params.id })
            
            res.status(200).send(user)
        } catch (error) {
            const code = error.code ? error.code : 500
            res.status(code).send(error)
        } 
    }
    
    all(req: Request, res: Response<UserAttributes[]>): void {
        throw "unimplemented"
    }
}