"use client"

import { ResetQuestions } from "@features/question/reset"
import { ShowNextQuestion } from "@features/question/show-next"
import { ShowPreviousQuestion } from "@features/question/show-previous"
import { ShuffleQuestions } from "@features/question/shuffle"
import cl from "./quiz-actions.module.scss"

export function QuizActions() {
    return (
        <div className={cl.questionActions}>
            <ShowPreviousQuestion />
            <ShuffleQuestions />
            <ResetQuestions />
            <ShowNextQuestion />
        </div>
    )
}
