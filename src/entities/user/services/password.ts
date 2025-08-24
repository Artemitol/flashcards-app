import "server-only"

import { pbkdf2, randomBytes } from "node:crypto"
import { PASSWORDS_SECRET } from "@shared/config/security"

type HashPasswordOptions = {
    password: string
    salt?: string
}
export const hashPassword = async ({
    password,
    salt = randomBytes(16).toString("hex"),
}: HashPasswordOptions): Promise<{ hashedPassword: string; salt: string }> => {
    const secret = PASSWORDS_SECRET
    const secretPassword = password.toString() + secret.toString()

    const hash = await new Promise<Buffer>((res, rej) =>
        pbkdf2(secretPassword, salt, 1000, 64, `sha512`, (error, value) =>
            error ? rej(error) : res(value)
        )
    )

    return {
        hashedPassword: hash.toString("hex"),
        salt: salt,
    }
}

type ComparePasswordsOptions = {
    passwordToCheck: string
    storedPassword: string
    salt: string
    secret: string
}
export const comparePasswords = async ({
    passwordToCheck,
    storedPassword,
    salt,
}: ComparePasswordsOptions) => {
    const { hashedPassword } = await hashPassword({
        password: passwordToCheck,
        salt,
    })

    if (hashedPassword === storedPassword) {
        return true
    }

    return false
}
