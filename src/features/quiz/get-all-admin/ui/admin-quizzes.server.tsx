import "server-only"

import { getAdminQuizzesService } from "@entities/quiz/server"
import { AdminQuizzes } from "./admin-quizzes"

export async function AdminQuizzes_server() {
    const quizzes = await getAdminQuizzesService()

    if (quizzes.type === "left") {
        return <div>error</div>
    }

    return <AdminQuizzes quizzes={quizzes.value} />
}
