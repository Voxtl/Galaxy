import express from "express"
import { createConnection } from "typeorm"
import { IngestController } from "./controllers/IngestController"
import { ProfileController } from "./controllers/ProfileController"
import { UserController } from "./controllers/UserController"

export class Server {
    readonly options: { address: string, port: number }

    constructor(options: {address: string, port: number}) {
        this.options = options
        this.database = undefined
    }

    public async init(): Promise<void> {
        await this.database.testConnection()

        const app = express()
        app.listen(this.options.port, this.options.address, () => {
            console.log(`Galaxy listening on: ${this.options.address}:${this.options.port}`)
        })

        app.use(express.json()) 

        // User Controller
        const users = new UserController(this.database)
        app.post("/v2/users", users.create)
        app.get("/v2/users", users.get)
        app.get("/v2/users/:id", users.getBulk)
        app.put("/v2/users/:id", users.update)
        app.delete("/v2/users/:id", users.delete)

        const ingest = new IngestController(this.database)
        app.post("/v2/publish", ingest.publish)
        app.post("/v2/end", ingest.end)

        const profile = new ProfileController(this.database)
    }
}