import "server-only"

import { eq } from "drizzle-orm"
import { userRepository } from "../repositories/user-repository"
import { users } from "@shared/model/db/server"
import { UserId } from "@kernel/ids"
import { left, right } from "@shared/lib/either"
import { unstable_cache } from "next/cache"

const getUserById = (id: UserId) =>
    unstable_cache(
        async () => {
            const queryResult = await userRepository.getUser(eq(users.id, id))

            if (queryResult) {
                return right(queryResult)
            }

            return left("no-such-user")
        },
        [id.toString()],
        {
            revalidate: 60,
            tags: ["user", "byId"],
        }
    )()

const getUserByUsername = (username: string) =>
    unstable_cache(
        async () => {
            const queryResult = await userRepository.getUser(
                eq(users.username, username)
            )

            if (queryResult) {
                return right(queryResult)
            }

            return left("no-such-user")
        },
        [username.toString()],
        {
            revalidate: 60,
            tags: ["user", "byUsername"],
        }
    )()

export const getUserService = {
    byId: getUserById,
    byUsername: getUserByUsername,
}
