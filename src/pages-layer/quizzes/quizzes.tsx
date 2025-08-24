import { QuizzesListServer } from "@features/quiz/get-list/server"
import { Spinner } from "@shared/ui/spinner"
import { Suspense } from "react"

export function QuizzesPage() {
    return (
        <>
            <h1 className='font-bold text-2xl mb-2'>Quizzes page</h1>
            <Suspense fallback={<Spinner />}>
                <QuizzesListServer />
            </Suspense>
        </>
    )
}
