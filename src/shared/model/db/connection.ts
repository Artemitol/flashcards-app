import "dotenv/config"
import * as schema from "./schema"
import { drizzle } from "drizzle-orm/node-postgres"

export const db = drizzle(process.env.DB_URL!, {
    schema,
})
