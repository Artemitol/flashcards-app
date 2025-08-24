import "server-only"

import { users } from "@shared/model/db/server"
import { or, eq } from "drizzle-orm"
import { userRepository } from "../repositories/user-repository"
import { hashPassword } from "./password"
import { fromDbUserToUserModel } from "../domain/mapers"
import { left, right } from "@shared/lib/either"

export const createUser = async ({
    username,
    password,
}: {
    username: string
    password: string
}) => {
    const existingUser = await userRepository.getUser(
        or(eq(users.username, username), eq(users.email, username))
    )

    if (existingUser) {
        return left("user-already-exists")
    }

    const { hashedPassword, salt } = await hashPassword({ password })

    const newUser = await userRepository.createUser({
        username,
        password: hashedPassword,
        salt,
    })

    return right(fromDbUserToUserModel(newUser))
}
