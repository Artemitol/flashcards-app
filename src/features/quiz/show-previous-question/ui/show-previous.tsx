"use client"

import { quizSliceActions } from "@entities/quiz"
import { QuizId } from "@kernel/ids"
import { Button } from "@shared/ui/button"
import { ArrowBigLeftIcon } from "lucide-react"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

type ShowPreviousQuestionInQuizProps = React.PropsWithChildren & {
    quizId: QuizId
    className?: string
}

export function ShowPreviousQuestionInQuiz(
    props: ShowPreviousQuestionInQuizProps
) {
    const { quizId, children, className } = props

    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(quizSliceActions.showPrevious(quizId))
    }, [dispatch, quizId])

    return (
        <Button className={className} onClick={onClick}>
            {children || (
                <>
                    <ArrowBigLeftIcon /> previous
                </>
            )}
        </Button>
    )
}
