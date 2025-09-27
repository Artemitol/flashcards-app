import { AppTransaction, dbClient, quizzes } from "@shared/model/db/server"
import { getTableColumns, SQL } from "drizzle-orm"
import { fromQuizWithRelationsDBtoQuizModel } from "../model/domain"
import { left, right } from "@shared/lib/either"
import { QuizInsertDB } from "../model/server"

const columns = getTableColumns(quizzes)

const getAll = async (where?: SQL) => {
    try {
        const data = await dbClient.query.quizzes.findMany({
            where,
            with: {
                creator: true,
                quizQuestions: {
                    with: {
                        question: {
                            with: {
                                creator: true,
                                tags: {
                                    with: {
                                        tag: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        const adaptedData = data.map(fromQuizWithRelationsDBtoQuizModel)

        return right(adaptedData)
    } catch (err) {
        return left({
            message: "cant-get-quizzes",
            err,
        })
    }
}

const insertOne = async (quizToInsert: QuizInsertDB) => {
    try {
        const [req] = await dbClient
            .insert(quizzes)
            .values(quizToInsert)
            .returning()

        return right(req)
    } catch (err) {
        return left({
            message: "cant-insert-quiz-now",
            err,
        })
    }
}

const insertOneTransacted = async (
    quizToInsert: QuizInsertDB,
    transaction: AppTransaction
) => {
    try {
        const [req] = await transaction
            .insert(quizzes)
            .values(quizToInsert)
            .returning()

        return right(req)
    } catch (err) {
        transaction.rollback()
        return left({
            message: "cant-insert-quiz-now",
            err,
        })
    }
}

const getOne = async (where?: SQL) => {
    try {
        const data = await dbClient.query.quizzes.findFirst({
            where,
            with: {
                creator: true,
                quizQuestions: {
                    with: {
                        question: {
                            with: {
                                creator: true,
                                tags: {
                                    with: {
                                        tag: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (!data) {
            return left({
                message: "no-such-quiz",
                whereStatement: where,
            })
        }

        const adaptedData = fromQuizWithRelationsDBtoQuizModel(data)

        return right(adaptedData)
    } catch (err) {
        return left({
            message: "cant-get-quizzes",
            err,
        })
    }
}

export const quizRepository = {
    getMany: getAll,
    getOne,
    insertOne,
    insertOneTransacted,
    columns,
}
