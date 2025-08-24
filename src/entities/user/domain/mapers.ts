import "server-only"

import { UserModel } from "./model"
import { UserDB } from "./db"

export const fromDbUserToUserModel = (dbData: UserDB): UserModel => {
    return {
        id: dbData.id,
        username: dbData.username,
        email: dbData.email,
        bio: dbData.bio,
        createdAt: dbData.createdAt,
    }
}
