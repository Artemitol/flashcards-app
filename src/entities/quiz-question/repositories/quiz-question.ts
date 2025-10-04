import "server-only"

import { left, right } from "@shared/lib/either"
import {
    AppTransaction,
    dbClient,
    quizQuestions,
} from "@shared/model/db/server"
import { getTableColumns } from "drizzle-orm"
import { QuizQuestionDB } from "../model/server"

const columns = getTableColumns(quizQuestions)

const insertMany = async (dataToInsert: QuizQuestionDB[]) => {
    try {
        const req = await dbClient
            .insert(quizQuestions)
            .values(dataToInsert)
            .returning()

        return right(req)
    } catch (err) {
        return left({ message: "something-went-wrong", err })
    }
}

const insertManyTransacted = async (
    dataToInsert: QuizQuestionDB[],
    transaction: AppTransaction
) => {
    try {
        const req = await transaction
            .insert(quizQuestions)
            .values(dataToInsert)
            .returning()

        return right(req)
    } catch (err) {
        transaction.rollback()

        return left({ message: "something-went-wrong", err })
    }
}

export const quizQuestionsRepository = {
    columns,
    insertMany,
    insertManyTransacted,
}
