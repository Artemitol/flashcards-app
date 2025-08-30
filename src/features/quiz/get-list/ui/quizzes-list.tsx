import { QuizModel, QuizCardsList } from "@entities/quiz"

type QuizzesListProps = {
    quizzes: QuizModel[]
}

export function QuizzesList(props: QuizzesListProps) {
    const { quizzes } = props

    return <QuizCardsList quizzes={quizzes} />
}
