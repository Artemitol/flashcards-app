import { questionActions, questionSelectors } from "@entities/question"
import { Button } from "@shared/ui/button"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

export function ResetQuestions({
    children = "Восстановить",
}: React.PropsWithChildren) {
    const dispatch = useDispatch()
    const isShuffled = useSelector(questionSelectors.isShuffled)

    const onClick = useCallback(() => {
        dispatch(questionActions.reset())
    }, [dispatch])

    return (
        <Button variant='secondary' onClick={onClick} disabled={!isShuffled}>
            {children}
        </Button>
    )
}
