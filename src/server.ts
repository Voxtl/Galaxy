import express from "express"
import { UserController } from "./controllers/UserController"

export class Server {
    readonly options: {
        address: string,
        port: number
    }

    constructor(options: {address: string, port: number}) {
        this.options = options
    }

    public init(): void {
        const app = express()
        app.listen(this.options.port, this.options.address, () => {
            console.log(`Galaxy listening on: ${this.options.address}:${this.options.port}`)
        })

        // User Controller
        const users = new UserController()
        app.post("/v2/users", users.create)
        app.get("/v2/users", users.findAll)
        app.get("/v2/users/:id", users.find)
        app.put("/v2/users/:id", users.update)
        app.delete("/v2/users/:id", users.delete)
    }
}