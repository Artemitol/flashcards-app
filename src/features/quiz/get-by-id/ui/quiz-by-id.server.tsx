import { QuizById } from "./quiz-by-id"
import { QuizByIdParams } from "../model/params-domain"
import cl from "./quiz-by-id.server.module.scss"
import { Typography } from "@shared/ui/typography"
import { getQuizByIdService } from "../services/get-quiz-by-id"

export async function QuizByIdServer({
    params,
    actionsSlot,
}: {
    params: QuizByIdParams
    actionsSlot?: React.ReactNode
}) {
    const { id } = await params

    const quiz = await getQuizByIdService(Number(id))

    if (quiz.type === "left") {
        return <div>something went wrong...</div>
    }

    return (
        <div className={cl.quizById}>
            <Typography variant='h2' className={cl.quizById__title}>
                {quiz.value.name}
            </Typography>
            <Typography variant='muted' className={cl.quizById__subTitle}>
                Created by:&nbsp;{quiz.value.creator.username}
            </Typography>
            {actionsSlot}
            <QuizById questions={quiz.value.questions} />
        </div>
    )
}
