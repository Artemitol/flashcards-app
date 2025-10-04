import { type QuizModel } from "../../model/domain"
import clsx from "clsx"
import cl from "./quiz-cards-list.module.scss"
import { QuizCard } from "../quiz-card"

type QuizCardsListProps = React.ComponentProps<"div"> & {
    quizzes: QuizModel[]
}

export function QuizCardsList(props: QuizCardsListProps) {
    const { quizzes, className, ...rest } = props

    return (
        <div className={clsx(cl.quizzesList, className)} {...rest}>
            {quizzes.map((el) => (
                <QuizCard key={el.id} quiz={el} />
            ))}
        </div>
    )
}
