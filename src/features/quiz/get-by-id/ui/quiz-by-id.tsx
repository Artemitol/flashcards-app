"use client"

import { QuestionFlipCard, QuestionModel } from "@entities/question"
import { useQuiz } from "../lib/use-quiz"

export function QuizById({ questions }: { questions: QuestionModel[] }) {
    const { currentCard } = useQuiz(questions)

    return <QuestionFlipCard card={currentCard} />
}
