import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres"
import { PgTransaction } from "drizzle-orm/pg-core"
import { users } from "../schema"
import * as schema from "../schema"
import { ExtractTablesWithRelations } from "drizzle-orm"

export async function seedUsers(
    tx: PgTransaction<
        NodePgQueryResultHKT,
        typeof schema,
        ExtractTablesWithRelations<typeof schema>
    >
) {
    const data = await tx
        .insert(users)
        .values([
            {
                id: 1,
                username: "admin",
                email: "admin@example.com",
                password: "hashed_password_admin",
                salt: "random_salt",
                bio: "I am an admin",
            },
            {
                id: 2,
                username: "user1",
                email: "user1@example.com",
                password: "hashed_password_user1",
                salt: "random_salt",
                bio: "Regular user",
            },
        ])
        .returning()

    return data
}
