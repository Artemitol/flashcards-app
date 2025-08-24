import "server-only"

import { users } from "@shared/model/db/server"
import { getTableColumns, SQL } from "drizzle-orm"
import { CreateUserDB, UserDB } from "../domain/db"
import { dbClient } from "@shared/model/db/server"
import { UserModel } from "../domain/model"
import { fromDbUserToUserModel } from "../domain/mapers"

const userColumns = getTableColumns(users)

const getFullUser = async (where?: SQL): Promise<UserDB | null> => {
    const users = await dbClient.query.users.findFirst({
        where,
    })

    if (users) {
        return users
    }

    return null
}

const getUser = async (where?: SQL): Promise<UserModel | null> => {
    const user = await getFullUser(where)

    if (user) {
        return fromDbUserToUserModel(user)
    }

    return null
}

const createUser = async (user: CreateUserDB): Promise<UserDB> => {
    const [createdUser] = await dbClient
        .insert(users)
        .values({ ...user })
        .returning()

    return createdUser
}

export const userRepository = {
    getFullUser,
    getUser,
    createUser,
    columns: userColumns,
}
