import { randomBytes } from "crypto"
import * as argon2 from "argon2"
import { Database } from "../Database"

export class AuthService {
    //TODO auth woohoo!
    generateToken() {
        throw "unimplemented"
    }

    async signUp(creds, database: Database) {
        const user = "whatever"
        // check if exists from username and email (maybe)


        // hash and salt
        const salt = randomBytes(32)
        const hashedPassword = await argon2.hash(creds.password, { salt })

        // create model(s)
        throw "unimplemented"
    }

    async signIn(creds, database: Database) {
        const user = "whatever"

        const isValidPassword = await argon2.verify(user.password, creds.password)

        throw "unimplemented"
    }
} 