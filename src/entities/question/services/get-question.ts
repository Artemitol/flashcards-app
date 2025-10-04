import "server-only"

import { left, right } from "@shared/lib/either"
import { questionRepository } from "../repositories/question-repository"
import { unstable_cache } from "next/cache"
import { BASE_CACHE_REVALIDATION_TIME } from "@shared/config/cache"
import { QuestionId } from "@kernel/ids"
import { eq } from "drizzle-orm"
import { QuestionCaching } from "../config/cache"

const getById = (questionId: QuestionId) =>
    unstable_cache(
        async () => {
            const data = await questionRepository.getOne(
                eq(questionRepository.columns.id, questionId)
            )

            if (data.type === "left") {
                return left({ message: "no-such-question", err: data.error })
            }

            return right(data.value)
        },
        [questionId.toString()],
        {
            revalidate: BASE_CACHE_REVALIDATION_TIME,
            tags: QuestionCaching.byIdCacher,
        }
    )()

const getAll = unstable_cache(
    async () => {
        const data = await questionRepository.getAll()

        if (data.type === "left") {
            return left({ message: "cant-get-questions", err: data.error })
        }

        return right(data.value)
    },
    QuestionCaching.listCacher,
    {
        revalidate: BASE_CACHE_REVALIDATION_TIME,
    }
)

export const getQuestionService = {
    getAll,
    getById,
}
