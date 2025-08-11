export type QuestionModel = {
    id: QuestionId
    group: QuestionsGroup
    question: string
    answer: string
}

export type QuestionId = number

export type QuestionsGroup = {
    id: number
    name: string
}
