import "server-only"

import { left, right } from "@shared/lib/either"
import { QuestionInsertNoSensitiveDB } from "../model/server"
import { questionRepository } from "../repositories/question-repository"

const createNew = async (data: QuestionInsertNoSensitiveDB) => {
    const mutation = await questionRepository.insertOne({ ...data })

    if (mutation.type === "left") {
        return left({ message: "500 error", err: mutation.error })
    }

    return right(mutation)
}

export const questionMutationsService = {
    createNew,
}
