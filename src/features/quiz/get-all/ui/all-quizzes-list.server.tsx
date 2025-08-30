import "server-only"

import { getQuizzesService } from "@entities/quiz/server"
import { AllQuizzesList } from "./all-quizzes-list"

export async function AllQuizzesList_server() {
    const quizzes = await getQuizzesService.getAll()

    if (quizzes.type === "left") {
        return <div>error</div>
    }

    return <AllQuizzesList quizzes={quizzes.value} />
}
