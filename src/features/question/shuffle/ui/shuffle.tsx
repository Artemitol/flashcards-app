import { questionActions } from "@entities/question"
import { Button } from "@radix-ui/themes"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

export function ShuffleQuestions({ children }: React.PropsWithChildren) {
    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(questionActions.shuffle())
    }, [dispatch])

    return <Button onClick={onClick}>{children}</Button>
}
