import { unstable_cache } from "next/cache"
import { eq } from "drizzle-orm"
import { BASE_CACHE_REVALIDATION_TIME } from "@shared/config/cache"
import { left, right } from "@shared/lib/either"
import { QuizCachingConfig } from "../config/cache"
import { quizRepository } from "../repositories/quiz-repository"

export const getAdminQuizzesService = unstable_cache(
    async () => {
        const req = await quizRepository.getMany(
            eq(quizRepository.columns.isAdmin, true)
        )

        if (req.type === "left") {
            return left("cant-get-admin-quizzes")
        }

        return right(req.value)
    },
    QuizCachingConfig.adminListCacher,
    {
        revalidate: BASE_CACHE_REVALIDATION_TIME,
    }
)
