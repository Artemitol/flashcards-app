import { QuizzesListServer } from "@features/quiz/get-list/server"
import { Spinner } from "@shared/ui/spinner"
import { Suspense } from "react"

export function QuizzesPage() {
    return (
        <>
            <h1>Quizzes page</h1>
            <Suspense fallback={<Spinner />}>
                <QuizzesListServer />
            </Suspense>
        </>
    )
}
