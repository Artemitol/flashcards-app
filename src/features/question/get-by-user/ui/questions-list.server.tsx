import "server-only"

import { QuestionsTable } from "@entities/question"
import { getQuestionByUserService } from "../services/get-questions-by-user"
import { UserId } from "@kernel/ids"

export async function QuestionsByUserList_server({
    userId,
}: {
    userId: UserId
}) {
    const request = await getQuestionByUserService.getAllById(userId)

    if (request.type === "left") {
        return <div>error: {request.error}</div>
    }

    return <QuestionsTable questions={request.value} />
}
