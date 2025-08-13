import cl from "./question-card.module.scss"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { QuestionModel } from "../model/domain"

type QuestionCardProps = {
    card: QuestionModel | null | undefined
}

export function QuestionCard({ card }: QuestionCardProps) {
    const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false)

    useEffect(() => {
        setIsAnswerRevealed(false)
    }, [card])

    function clickHandler() {
        setIsAnswerRevealed((prev) => !prev)
    }

    if (!card) {
        return <div>Нет данных по вопросу(</div>
    }

    return (
        <article className={cl.card}>
            <div className={cl.card__header}>
                <div className={cl.card__headerText}>
                    <h3 className={cl.card__title}>{card.question}</h3>
                    <h4
                        className={clsx(
                            cl.card__title,
                            cl.card__title_ghosted,
                            cl.card__title_small
                        )}
                    >
                        Тема: {card.group.name}
                    </h4>
                </div>
                <div className={cl.card__number}>
                    <span>{card.id}</span>
                </div>
            </div>
            {isAnswerRevealed && (
                <div className={cl.card__answer}>
                    <p>{card.answer}</p>
                </div>
            )}
            <button type='button' onClick={clickHandler}>
                <span>Показать ответ </span>
                <span>
                    {isAnswerRevealed ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
            </button>
        </article>
    )
}
