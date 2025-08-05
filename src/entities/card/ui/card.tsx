import type { CardModel } from "@entities/card/model/domain"
import cl from "./card.module.scss"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"

type CardProps = {
    card: CardModel
}

export function Card({ card }: CardProps) {
    const { answer, group, id, question } = card
    const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false)

    useEffect(() => {
        setIsAnswerRevealed(false)
    }, [card])

    function clickHandler() {
        setIsAnswerRevealed((prev) => !prev)
    }

    return (
        <article className={cl.card}>
            <div className={cl.card__header}>
                <div className={cl.card__headerText}>
                    <h3 className={cl.card__title}>{question}</h3>
                    <h4
                        className={clsx(
                            cl.card__title,
                            cl.card__title_ghosted,
                            cl.card__title_small
                        )}
                    >
                        Тема: {group.name}
                    </h4>
                </div>
                <div className={cl.card__number}>
                    <span>{id}</span>
                </div>
            </div>
            {isAnswerRevealed && (
                <div className={cl.card__answer}>
                    <p>{answer}</p>
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
