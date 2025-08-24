import "server-only"

import { getQuizzesService } from "@entities/quiz/server"
import { QuizzesList } from "./quizzes-list"

export async function QuizzesListServer() {
    const quizzes = await getQuizzesService.getAll()

    if (quizzes.type === "left") {
        return <div>error</div>
    }

    return <QuizzesList quizzes={quizzes.value} />
}
