import { QuizModel, QuizCardsList } from "@entities/quiz"
import cl from "./community-quizzes.module.scss"

type QuizzesListProps = {
    quizzes: QuizModel[]
}

export function CommunityQuizzes(props: QuizzesListProps) {
    const { quizzes } = props

    return <QuizCardsList className={cl.communityQuizzes} quizzes={quizzes} />
}
