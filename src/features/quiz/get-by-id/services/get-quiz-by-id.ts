import { getQuizzesService } from "@entities/quiz/server"
import { QuizId } from "@kernel/ids"
import { notFound } from "next/navigation"

export const getQuizByIdService = async (quizId: QuizId) => {
    const quiz = await getQuizzesService.getById(quizId)

    if (quiz.type === "left" && quiz.error.message === "no-such-quiz") {
        notFound()
    }

    return quiz
}
