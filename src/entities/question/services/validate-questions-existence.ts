import "server-only"

import { QuestionId } from "@kernel/ids"
import { BASE_CACHE_REVALIDATION_TIME } from "@shared/config/cache"
import { unstable_cache } from "next/cache"
import { QuestionCaching } from "../server"
import { questionRepository } from "../repositories/question-repository"
import { inArray } from "drizzle-orm"
import { left, right } from "@shared/lib/either"

export const validateQuestionsExistenceService = (
    questionIds: QuestionId[]
) => {
    const idsKey = questionIds.toSorted((a, b) => a - b).join(".")

    return unstable_cache(
        async () => {
            const data = await questionRepository.getAll(
                inArray(questionRepository.columns.id, questionIds)
            )

            if (data.type === "left") {
                return left("error-in-request")
            }

            const foundIds = data.value.map((question) => question.id)

            const missingIds = questionIds.filter(
                (id) => !foundIds.includes(id)
            )

            if (missingIds.length > 0) {
                return left({ message: "no-such-questions", ids: missingIds })
            }

            return right(true)
        },
        [idsKey],
        {
            revalidate: BASE_CACHE_REVALIDATION_TIME,
            tags: QuestionCaching.validateListCacher,
        }
    )()
}
