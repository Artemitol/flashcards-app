"use client"

import { questionActions } from "@entities/question"
import { Button } from "@shared/ui/button"
import { useCallback } from "react"
import { useDispatch } from "react-redux"

export function ShowNextQuestion({
    children = "Вперед",
}: React.PropsWithChildren) {
    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(questionActions.showNext())
    }, [dispatch])

    return <Button onClick={onClick}>{children}</Button>
}
