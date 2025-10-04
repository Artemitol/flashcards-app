import { questionRepository } from "@entities/question/repositories/question-repository"
import { UserId } from "@kernel/ids"
import { left, right } from "@shared/lib/either"
import { eq } from "drizzle-orm"
import { unstable_cache } from "next/cache"

const getAllById = (userId: UserId) =>
    unstable_cache(
        async () => {
            const req = await questionRepository.getAll(
                eq(questionRepository.columns.creatorId, userId)
            )

            if (
                (req.type === "left" && req.error === "no-questions") ||
                (req.type === "right" && req.value.length === 0)
            ) {
                return left("dont-have-questions-yet")
            } else if (req.type === "left") {
                return left("something-went-wrong")
            }

            return right(req.value)
        },
        [userId.toString()],
        {
            revalidate: 60,
            tags: ["question", "byUserId"],
        }
    )()

export const getQuestionByUserService = {
    getAllById,
}
