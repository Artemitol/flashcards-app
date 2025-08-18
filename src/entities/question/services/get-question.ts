import "server-only"

import { left, right } from "@shared/lib/either"
import { questionRepository } from "../repositories/question-repository"

const getById = async () => {
    const data = await questionRepository.getOne()

    if (data.type === "left") {
        return left({ message: "no-such-question", err: data.error })
    }

    return right(data.value)
}

const getAll = async () => {
    const data = await questionRepository.getAll()

    if (data.type === "left") {
        return left({ message: "cant-get-questions", err: data.error })
    }

    return right(data.value)
}

export const getQuestionService = {
    getAll,
    getById,
}
