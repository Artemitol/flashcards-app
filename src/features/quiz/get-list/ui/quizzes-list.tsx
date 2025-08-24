import { QuizCard, QuizModel } from "@entities/quiz"
import cl from "./quizzes-list.module.scss"

export function QuizzesList({ quizzes }: { quizzes: QuizModel[] }) {
    return (
        <div className={cl.quizzesList}>
            {quizzes.map((el) => (
                <QuizCard key={el.id} quiz={el} />
            ))}
        </div>
    )
}
