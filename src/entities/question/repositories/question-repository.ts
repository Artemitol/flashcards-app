import "server-only"

import { getTableColumns, SQL } from "drizzle-orm"
import {
    fromQuestionDBtoQuestionModel,
    fromQuestionWithRelationsDBtoQuestionModel,
} from "../model/domain/question"
import { questions } from "@shared/model/db/schema"
import { dbClient } from "@shared/model/db/server"
import { QuestionInsertDB } from "../model/server"
import { left, right } from "@shared/lib/either"

const columns = getTableColumns(questions)

const getQuestions = async (where?: SQL) => {
    const data = await dbClient.query.questions.findMany({
        with: {
            tags: {
                with: {
                    tag: true,
                },
            },
            creator: true,
        },
        where,
    })

    if (!data) {
        return left("no-questions")
    }

    const adapted = data.map(fromQuestionWithRelationsDBtoQuestionModel)

    return right(adapted)
}

const getOneQuestion = async (where?: SQL) => {
    try {
        const data = await dbClient.query.questions.findFirst({
            with: {
                tags: {
                    with: {
                        tag: true,
                    },
                },
                creator: true,
            },
            where,
        })

        if (!data) {
            return left("no-such-question")
        }

        const adaptedData = fromQuestionWithRelationsDBtoQuestionModel(data)

        return right(adaptedData)
    } catch (err) {
        return left(err)
    }
}

const createQuestion = async (questionToCreate: QuestionInsertDB) => {
    try {
        const [data] = await dbClient
            .insert(questions)
            .values({ ...questionToCreate })
            .returning()

        const adaptedData = fromQuestionDBtoQuestionModel(data)

        return right(adaptedData)
    } catch (err) {
        return left({ message: "cant-create-question", err })
    }
}

export const questionRepository = {
    getAll: getQuestions,
    getOne: getOneQuestion,
    insertOne: createQuestion,
    columns,
}
