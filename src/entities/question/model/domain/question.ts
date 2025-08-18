import { QuestionId, UserId } from "@kernel/ids"
import { QuestionTag } from "./question-tag"
import { Adapter } from "@shared/model/adapter"
import { QuestionDB, QuestionWithRelationsDB } from "../server"

export type QuestionBaseModel = {
    id: QuestionId
    question: string
    answer: string
    createdAt: Date
}

export type QuestionModel = QuestionBaseModel & {
    tags: QuestionTag[]
    creator: Creator
}

export type Creator = {
    userId: UserId
    username: string
}

export const fromQuestionDBtoQuestionModel: Adapter<
    QuestionDB,
    QuestionBaseModel
> = (raw) => ({
    id: raw.id,
    answer: raw.answer,
    question: raw.question,
    createdAt: raw.createdAt,
})

export const fromQuestionWithRelationsDBtoQuestionModel: Adapter<
    QuestionWithRelationsDB,
    QuestionModel
> = (raw) => ({
    id: raw.id,
    question: raw.question,
    answer: raw.answer,
    creator: {
        userId: raw.creator.id,
        username: raw.creator.username,
    },
    tags: raw.tags.map(({ tag }) => ({
        id: tag.id,
        name: tag.name,
    })),
    createdAt: raw.createdAt,
})
