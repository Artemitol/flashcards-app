import "server-only"

import { eq } from "drizzle-orm"
import { userRepository } from "../repositories/user-repository"
import { users } from "@shared/model/db/server"
import { UserId } from "@kernel/ids"
import { left, right } from "@shared/lib/either"

const getUserById = async (id: UserId) => {
    const queryResult = await userRepository.getUser(eq(users.id, id))

    if (queryResult) {
        return right(queryResult)
    }

    return left("no-such-user")
}

const getUserByUsername = async (username: string) => {
    const queryResult = await userRepository.getUser(
        eq(users.username, username)
    )

    if (queryResult) {
        return right(queryResult)
    }

    return left("no-such-user")
}

export const getUserService = {
    byId: getUserById,
    byUsername: getUserByUsername,
}
