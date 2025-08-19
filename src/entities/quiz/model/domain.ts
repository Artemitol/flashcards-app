import {
    QuestionModel,
    fromQuestionWithRelationsDBtoQuestionModel,
} from "@entities/question/@x/quiz"
import { QuizId, UserId } from "@kernel/ids"
import { Adapter } from "@shared/model/adapter"
import { QuizWithQuestionsDB } from "./server"

export type QuizModel = {
    id: QuizId
    name: string | null
    creator: Creator
    createdAt: Date
    questions: QuestionModel[]
}

type Creator = {
    id: UserId
    username: string
}

export const fromQuizWithRelationsDBtoQuizModel: Adapter<
    QuizWithQuestionsDB,
    QuizModel
> = (raw) => ({
    id: raw.id,
    name: raw.title,
    createdAt: raw.createdAt,
    questions: raw.quizQuestions.map(({ question }) =>
        fromQuestionWithRelationsDBtoQuestionModel(question)
    ),
    creator: {
        id: raw.creatorId,
        username: raw.creator.username,
    },
})
