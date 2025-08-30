import { AllQuizzesList_server } from "@features/quiz/get-all/server"
import { Spinner } from "@shared/ui/spinner"
import { Suspense } from "react"

export function QuizzesPage() {
    return (
        <>
            <h1 className='font-bold text-2xl mb-2'>Quizzes page</h1>
            <Suspense fallback={<Spinner />}>
                <AllQuizzesList_server />
            </Suspense>
        </>
    )
}
