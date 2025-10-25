import { QuizModel, QuizCardsList } from "@entities/quiz"
import cl from "./admin-quizzes.module.scss"

type QuizzesListProps = {
    quizzes: QuizModel[]
}

export function AdminQuizzes(props: QuizzesListProps) {
    const { quizzes } = props

    return <QuizCardsList className={cl.adminQuizzes} quizzes={quizzes} />
}
