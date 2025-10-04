"use client"

import { type QuestionModel, QuestionFlipCard } from "@entities/question"
import { useQuiz } from "../lib/use-quiz"
import { QuizId } from "@kernel/ids"

export function QuizById({
    questions,
    id,
}: {
    questions: QuestionModel[]
    id: QuizId
}) {
    const { currentCard } = useQuiz({
        questions,
        quizId: id,
    })

    return <QuestionFlipCard card={currentCard} />
}
