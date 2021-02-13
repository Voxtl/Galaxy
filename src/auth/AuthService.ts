import { randomBytes } from "crypto"
import * as argon2 from "argon2"
import * as jwt from "jsonwebtoken"
import { User } from "../entities/UserEntity"
import { getConnection, Repository } from "typeorm"
import { APIError } from "../error/APIError"

import type { v5 as uuid } from "uuid"
import type {
    User as UserAttributes
} from "@voxtl/types"

export class AuthService {
    userRepository: Repository<User>

    constructor() {
        this.userRepository = getConnection().getRepository(User)
    }
    //TODO auth woohoo!
    generateToken(user_id: typeof uuid, exp: Date) {
        try {
            return jwt.sign(
                {
                    _id: user_id,
                    exp: exp || Math.floor(Date.now() / 1000) + 60 * 60,
                },
                process.env.SECRET as string
            )
        } catch (error) {
            throw new APIError(500, "Token Generation failed. (How does this happen?)")
        }
    }

    async signUp(creds: UserAttributes) {
        // hash and salt
        const salt = randomBytes(32)
        const hashedPassword = await argon2.hash(user.password, { salt })

        // create model(s)
        throw "unimplemented"
    }

    async signIn(creds: any) {
        const isValidPassword = await argon2.verify(user.password, creds.password)

        throw "unimplemented"
    }
} 