"use client"

import { ResetQuiz } from "@features/quiz/reset-questions"
import { ShowNextQuestionInQuiz } from "@features/quiz/show-next-question"
import { ShowPreviousQuestionInQuiz } from "@features/quiz/show-previous-question"
import { ShuffleQuiz } from "@features/quiz/shuffle-questions"
import cl from "./quiz-actions.module.scss"
import { QuizId } from "@kernel/ids"

export function QuizActions({ quizId }: { quizId: QuizId }) {
    return (
        <div className={cl.questionActions}>
            <ShowPreviousQuestionInQuiz quizId={quizId} />
            <ShuffleQuiz quizId={quizId} />
            <ResetQuiz quizId={quizId} />
            <ShowNextQuestionInQuiz quizId={quizId} />
        </div>
    )
}
