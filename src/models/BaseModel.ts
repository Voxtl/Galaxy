import type { v5 as uuid } from "uuid"

export class BaseModel {
    // Change this later.
    protected _isUUID(id: any): id is typeof uuid {
        const parsedID = id.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)

        return parsedID !== null
    }
}