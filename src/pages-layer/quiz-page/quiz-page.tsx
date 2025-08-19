import {
    QuizByIdServer,
    type QuizByIdParams,
} from "@features/quiz/get-by-id/server"
import { Spinner } from "@shared/ui/spinner"
import { Suspense } from "react"

export function QuizPage({ params }: { params: QuizByIdParams }) {
    return (
        <>
            <h1>Quiz details page</h1>
            <Suspense fallback={<Spinner />}>
                <QuizByIdServer params={params} />
            </Suspense>
        </>
    )
}
