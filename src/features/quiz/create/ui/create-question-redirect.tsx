"use client"

import { Button } from "@shared/ui/button"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"

type CreateQuestionWithRedirectProps = React.ComponentProps<"button"> & {}

export function CreateQuizRedirect(props: CreateQuestionWithRedirectProps) {
    const { children = "Create question", onClick, ...rest } = props

    const router = useRouter()

    function clickHandler(e: MouseEvent<HTMLButtonElement>) {
        onClick?.(e)

        router.push("/create/quiz")
    }

    return (
        <Button onClick={clickHandler} {...rest}>
            {children}
        </Button>
    )
}
