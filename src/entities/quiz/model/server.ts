import "server-only"

import { dbClient } from "@shared/model/db/server"
import { quizzes } from "@shared/model/db/schema"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type QuizDB = InferSelectModel<typeof quizzes>
export type QuizInsertDB = InferInsertModel<typeof quizzes>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _extractQuizWithRelationsDB = async () => {
    return await dbClient.query.quizzes.findFirst({
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
}
export type QuizWithQuestionsDB = NonNullable<
    Awaited<ReturnType<typeof _extractQuizWithRelationsDB>>
>
