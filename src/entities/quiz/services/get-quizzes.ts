import { eq } from "drizzle-orm"
import { quizRepository } from "../repositories/quiz-repository"
import { QuizId } from "@kernel/ids"

const getAll = async () => {
    const data = await quizRepository.getMany()

    return data
}

const getById = async (id: QuizId) => {
    const data = await quizRepository.getOne(eq(quizRepository.columns.id, id))

    return data
}

export const getQuizzesService = {
    getAll,
    getById,
}
