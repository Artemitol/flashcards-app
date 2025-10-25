import { QuizByIdParams } from "@features/quiz/get-by-id/server"
import { QuizPage } from "@pages/quiz-page"

export default function QuizByIdNextPage({
    params,
}: {
    params: QuizByIdParams
}) {
    return <QuizPage params={params} />
}
