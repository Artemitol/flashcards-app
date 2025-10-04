import "server-only"

import { QuestionModel } from "@entities/question"
import { sessionService } from "@entities/user/server"
import { getQuestionByUserService } from "@features/question/get-by-user/server"
import { CreateQuizForm } from "@features/quiz/create"

export async function CreateQuizWidget_server() {
    const { session } = await sessionService.verifySession()

    if (session.type === "left") {
        return <CreateQuizForm />
    }

    const questionReq = await getQuestionByUserService.getAllById(
        session.value.userId
    )

    let questions: QuestionModel[]

    if (questionReq.type === "left") {
        questions = []
    } else {
        questions = questionReq.value
    }

    return <CreateQuizForm questions={questions} />
}
