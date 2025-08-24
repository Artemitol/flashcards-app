import { UserId } from "@kernel/ids"

export type UserModel = {
    id: UserId
    username: string
    email: string | null
    bio: string | null
    createdAt: Date
}

export type SessionPayload = {
    userId: UserId
    username: UserModel["username"]
    email: UserModel["email"]
}
