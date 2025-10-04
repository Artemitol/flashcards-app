import { drizzle, NeonHttpQueryResultHKT } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import * as schema from "./schema"
import { PgTransaction } from "drizzle-orm/pg-core"
import { ExtractTablesWithRelations } from "drizzle-orm"

config({ path: ".env" }) // or .env.local

const sql = neon(process.env.POSTGRES_URL!)
export const dbClient = drizzle({ client: sql, schema })

export type AppTransaction = PgTransaction<
    NeonHttpQueryResultHKT,
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
>
