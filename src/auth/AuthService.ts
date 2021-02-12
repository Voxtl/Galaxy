import { randomBytes } from "crypto"
import * as argon2 from "argon2"
import { User } from "../entities/UserEntity"
import { Connection, getConnection } from "typeorm"
import type { v5 as uuid } from "uuid"
export class AuthService {
    connection: Connection

    constructor() {
        this.connection = getConnection()
    }
    //TODO auth woohoo!
    generateToken() {
        throw "unimplemented"
    }

    async signUp(creds: any, user_id: typeof uuid) {
        // hash and salt
        const salt = randomBytes(32)
        const hashedPassword = await argon2.hash(user.password, { salt })

        // create model(s)
        throw "unimplemented"
    }

    async signIn(creds: any, user_id: typeof uuid) {
        const isValidPassword = await argon2.verify(user.password, creds.password)

        throw "unimplemented"
    }
} 