import "server-only"

import { eq } from "drizzle-orm"
import { userRepository } from "../repositories/user-repository"
import { comparePasswords } from "./password"
import { users } from "@shared/model/db/server"
import { left, right } from "@shared/lib/either"

export const verifyUserPassword = async ({
    login,
    password,
}: {
    login: string
    password: string
}) => {
    const user = await userRepository.getFullUser(eq(users.username, login))

    if (!user) {
        return left("no-such-user")
    }

    const isPasswordsEqual = await comparePasswords({
        passwordToCheck: password,
        salt: user.salt,
        secret: process.env.PASSWORD_SECRET_KEY!,
        storedPassword: user.password,
    })

    if (isPasswordsEqual) {
        return right(user)
    } else {
        return left("wrong-password")
    }
}
