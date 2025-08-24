"use client"

import { Skeleton } from "@shared/ui/skeleton"
import { QuizModel } from "../model/domain"
import cl from "./quiz-card.module.scss"
import { Card, CardFooter, CardHeader, CardTitle } from "@shared/ui/card"
import { useCallback } from "react"
import { useRouter } from "next/navigation"

type QuizCardProps = {
    quiz: QuizModel
    isLoading?: boolean
}

export function QuizCard(props: QuizCardProps) {
    const { quiz, isLoading = false } = props

    const router = useRouter()

    const clickHandler = useCallback(() => {
        router.push(`/quizzes/${quiz.id}`)
    }, [quiz.id, router])

    if (isLoading) {
        return <Skeleton />
    }

    return (
        <Card className={cl.quizCard} onClick={clickHandler}>
            <CardHeader>
                <CardTitle>{quiz.name}</CardTitle>
            </CardHeader>
            <CardFooter>creator: {quiz.creator.username}</CardFooter>
        </Card>
    )
}
