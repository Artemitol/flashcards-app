import { eq } from "drizzle-orm"
import { quizRepository } from "../repositories/quiz-repository"
import { QuizId } from "@kernel/ids"
import { unstable_cache } from "next/cache"
import { BASE_CACHE_REVALIDATION_TIME } from "@shared/config/cache"

const getAll = unstable_cache(
    async () => {
        const data = await quizRepository.getMany()

        return data
    },
    ["quizzes"],
    {
        revalidate: BASE_CACHE_REVALIDATION_TIME,
    }
)

const getById = (id: QuizId) =>
    unstable_cache(
        async () => {
            const data = await quizRepository.getOne(
                eq(quizRepository.columns.id, id)
            )

            return data
        },
        [id.toString()],
        {
            revalidate: BASE_CACHE_REVALIDATION_TIME,
            tags: ["quizzes", "by-id"],
        }
    )()

export const getQuizzesService = {
    getAll,
    getById,
}
