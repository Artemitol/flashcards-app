import "server-only"

import { QuestionsTable } from "@entities/question"
import { getQuestionByUserService } from "../services/get-questions-by-user"
import { UserId } from "@kernel/ids"
import { EmptyPlaceholder } from "@shared/ui/empty-placeholder"
import cl from "./questions-list.server.module.scss"

export async function QuestionsByUserList_server({
    userId,
}: {
    userId: UserId
}) {
    const request = await getQuestionByUserService.getAllById(userId)

    if (request.type === "left") {
        return (
            <EmptyPlaceholder
                className={cl.emptyQuestions}
                message={
                    request.error === "dont-have-questions-yet"
                        ? "You haven`t created questions yet"
                        : "Something went wrong..."
                }
            />
        )
    }

    return <QuestionsTable questions={request.value} />
}
