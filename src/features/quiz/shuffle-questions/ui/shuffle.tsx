"use client"

import { quizSliceActions } from "@entities/quiz"
import { QuizId } from "@kernel/ids"
import { Button } from "@shared/ui/button"
import { Shuffle } from "lucide-react"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

type ShuffleQuizProps = React.PropsWithChildren & {
    quizId: QuizId
    className?: string
}

export function ShuffleQuiz(props: ShuffleQuizProps) {
    const { quizId, children, className } = props

    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(quizSliceActions.shuffle(quizId))
    }, [dispatch, quizId])

    return (
        <Button className={className} onClick={onClick}>
            {children || (
                <>
                    <Shuffle /> shuffle
                </>
            )}
        </Button>
    )
}
