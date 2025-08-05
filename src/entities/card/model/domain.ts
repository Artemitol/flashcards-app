export type CardModel = {
    id: CardId
    group: QuestionsGroup
    question: string
    answer: string
}

export type CardId = number

export type QuestionsGroup = {
    id: number
    name: string
}
