import express from "express"
import { IngestController } from "./controllers/IngestController"
import { UserController } from "./controllers/UserController"
import { Database } from "./Database"

export class Server {
    readonly options: { address: string, port: number }

    constructor(options: {address: string, port: number}) {
        this.options = options
    }

    public async init(): Promise<void> {
        const database = new Database(process.env.DB_URI as string)

        await database.testConnection()

        const app = express()
        app.listen(this.options.port, this.options.address, () => {
            console.log(`Galaxy listening on: ${this.options.address}:${this.options.port}`)
        })

        // User Controller
        const users = new UserController()
        app.post("/v2/users", users.create)
        app.get("/v2/users", users.get)
        app.get("/v2/users/:id", users.getBulk)
        app.put("/v2/users/:id", users.update)
        app.delete("/v2/users/:id", users.delete)

        const ingest = new IngestController()
        app.post("/v2/publish", ingest.publish)
        app.post("/v2/end", ingest.end)
    }
}