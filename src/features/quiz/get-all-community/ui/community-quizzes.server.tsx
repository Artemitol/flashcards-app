import "server-only"

import { getCommunityQuizzesService } from "@entities/quiz/server"
import { CommunityQuizzes } from "./community-quizzes"

export async function CommunityQuizzes_server() {
    const quizzes = await getCommunityQuizzesService()

    if (quizzes.type === "left") {
        return <div>error</div>
    }

    return <CommunityQuizzes quizzes={quizzes.value} />
}
