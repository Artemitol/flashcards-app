import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import * as schema from "./schema"

config({ path: ".env" }) // or .env.local

const sql = neon(process.env.DATABASE_URL!)
export const dbClient = drizzle({ client: sql, schema })
