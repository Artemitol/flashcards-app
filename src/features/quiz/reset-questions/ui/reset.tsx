import { quizSliceActions, quizSliceSelectors } from "@entities/quiz"
import { QuizId } from "@kernel/ids"
import { useAppDispatch, useAppSelector } from "@shared/lib/redux"
import { Button } from "@shared/ui/button"
import { Undo2 } from "lucide-react"
import { useCallback } from "react"

type ResetQuizProps = React.PropsWithChildren & {
    quizId: QuizId
    className?: string
}

export function ResetQuiz(props: ResetQuizProps) {
    const { children, quizId, className } = props

    const dispatch = useAppDispatch()
    const isShuffled = useAppSelector((state) =>
        quizSliceSelectors.isShuffled(state, quizId)
    )

    const onClick = useCallback(() => {
        dispatch(quizSliceActions.reset(quizId))
    }, [dispatch, quizId])

    return (
        <Button
            className={className}
            variant='secondary'
            onClick={onClick}
            disabled={!isShuffled}
        >
            {children || (
                <>
                    <Undo2 /> reset
                </>
            )}
        </Button>
    )
}
