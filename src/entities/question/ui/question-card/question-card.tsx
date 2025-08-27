"use client"

import { QuestionModel } from "@entities/question/@x/quiz"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@shared/ui/card"
import clsx from "clsx"

type QuestionCardProps = React.ComponentProps<"div"> & {
    questionData: QuestionModel
    footerSlot?: React.ReactNode
}

export function QuestionCard({
    className,
    questionData,
    footerSlot,
    ...rest
}: QuestionCardProps) {
    return (
        <Card className={clsx(className)} {...rest}>
            <CardHeader>
                <CardTitle>{questionData.question}</CardTitle>
                <CardDescription>
                    created by: {questionData.creator.username}
                </CardDescription>
            </CardHeader>
            {footerSlot && <CardFooter>{footerSlot}</CardFooter>}
        </Card>
    )
}
