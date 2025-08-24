import { users } from "../schema"
import { dbClient } from "../connection"

export async function seedUsers() {
    const data = await dbClient
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
