import "server-only"

import { dbClient, tags } from "@shared/model/db/server"
import { SQL } from "drizzle-orm"
import { left, right } from "@shared/lib/either"
import { TagInsertDB } from "../model/server"

const getAll = async (where?: SQL) => {
    const data = await dbClient.query.tags.findMany({
        where,
    })

    if (!data) {
        return left("no-tags-provided")
    }

    return right(data)
}

const getOne = async (where?: SQL) => {
    const data = await dbClient.query.tags.findFirst({
        where,
    })

    if (!data) {
        return left("no-such-tag")
    }

    return right(data)
}

const insertOne = async (tagToCreate: TagInsertDB) => {
    try {
        const [data] = await dbClient
            .insert(tags)
            .values(tagToCreate)
            .returning()

        return right(data)
    } catch (err) {
        return left({ message: "500 error. Cant create tag", err })
    }
}

export const questionTagsRepository = {
    getAll,
    getOne,
    insertOne,
}
