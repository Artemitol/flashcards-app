import { type QuizModel } from "../../model/domain"
import clsx from "clsx"
import cl from "./quiz-cards-list.module.scss"
import { QuizCard } from "../quiz-card"
import { EmptyPlaceholder } from "@shared/ui/empty-placeholder"

type QuizCardsListProps = React.ComponentProps<"div"> & {
    quizzes: QuizModel[]
}

export function QuizCardsList(props: QuizCardsListProps) {
    const { quizzes, className, ...rest } = props

    if (quizzes.length === 0) {
        return (
            <EmptyPlaceholder
                className={cl.emptyQuizzes}
                message='Here is no quizzes yet('
            />
        )
    }

    return (
        <div className={clsx(cl.quizzesList, className)} {...rest}>
            {quizzes.map((el) => (
                <QuizCard key={el.id} quiz={el} />
            ))}
        </div>
    )
}
