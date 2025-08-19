import { dbClient, quizzes } from "@shared/model/db/server"
import { getTableColumns, SQL } from "drizzle-orm"
import { fromQuizWithRelationsDBtoQuizModel } from "../model/domain"
import { left, right } from "@shared/lib/either"

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
    columns,
}
