import {
    QuizByIdServer,
    type QuizByIdParams,
} from "@features/quiz/get-by-id/server"
import { Spinner } from "@shared/ui/spinner"
import { Typography } from "@shared/ui/typography"
import { Suspense } from "react"
import cl from "./quiz-page.module.scss"

export function QuizPage({ params }: { params: QuizByIdParams }) {
    return (
        <>
            <Typography variant='h1' className={cl.quizPage__title}>
                Quiz details page
            </Typography>
            <Suspense fallback={<Spinner />}>
                <QuizByIdServer params={params} />
            </Suspense>
        </>
    )
}
