"use client"

import { quizSliceActions } from "@entities/quiz"
import { QuizId } from "@kernel/ids"
import { Button } from "@shared/ui/button"
import { ArrowBigRightIcon } from "lucide-react"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

type ShowNextQuestionInQuizProps = React.PropsWithChildren & {
    quizId: QuizId
    className?: string
}

export function ShowNextQuestionInQuiz(props: ShowNextQuestionInQuizProps) {
    const { quizId, children, className } = props

    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(quizSliceActions.showNext(quizId))
    }, [dispatch, quizId])

    return (
        <Button className={className} onClick={onClick}>
            {children || (
                <>
                    <ArrowBigRightIcon />
                    next
                </>
            )}
        </Button>
    )
}
