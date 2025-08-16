import { questionActions } from "@entities/question"
import { Button } from "@shared/ui/button"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

export function ShuffleQuestions({ children }: React.PropsWithChildren) {
    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(questionActions.shuffle())
    }, [dispatch])

    return <Button onClick={onClick}>{children}</Button>
}
