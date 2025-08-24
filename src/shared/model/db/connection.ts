import "dotenv/config"
import * as schema from "./schema"
import { drizzle } from "drizzle-orm/node-postgres"

export const dbClient = drizzle(process.env.DB_URL!, {
    schema,
})
