import { sessionService } from "@entities/user/server"
import { getQuestionByUserService } from "@features/question/get-by-user/@x/quiz"
import { CreateNewQuestionModal } from "./create-quiz-modal"

export async function CreateQuizModal_server() {
    const { session } = await sessionService.verifySession()

    if (session.type === "left") {
        return <CreateNewQuestionModal disabled />
    }

    const questionsReq = await getQuestionByUserService.getAllById(
        session.value.userId
    )

    if (questionsReq.type === "left") {
        return <CreateNewQuestionModal disabled />
    }

    return <CreateNewQuestionModal questions={questionsReq.value} />
}
