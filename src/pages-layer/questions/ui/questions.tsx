"use client"

import clsx from "clsx"
import { QuestionCard, useQuestionCards } from "@entities/question"
import { Button, Progress } from "@radix-ui/themes"
import cl from "./questions.module.scss"
import { ShuffleIcon, LucideRotateCcw } from "lucide-react"

export function QuestionsPage() {
    const {
        currentNumber,
        maxAmount,
        data,
        resetCards,
        showNextCard,
        showPreviousCard,
        shuffleCards,
    } = useQuestionCards()

    return (
        <section className={cl.cardsPage}>
            <div className={cl.cardsPage__header}>
                <div className={clsx(cl.cardPage__counter, cl.counter)}>
                    <span>{currentNumber}</span>
                    <span>из</span>
                    <span>{maxAmount}</span>
                </div>
                <Progress
                    className={cl.cardsPage__progress}
                    value={(currentNumber / data.sourceOfTruth.length) * 100}
                />
            </div>
            <div className={cl.cardsPage__cardWrapper}>
                <QuestionCard card={data.currentCard} />
            </div>
            <div className={cl.cardsPage__actions}>
                <Button
                    className={cl.button}
                    type='button'
                    onClick={showPreviousCard}
                >
                    Назад
                </Button>
                <Button
                    className={clsx(cl.button, cl.button_withIcon)}
                    type='button'
                    onClick={shuffleCards}
                >
                    <span>Перемешать</span>
                    <span>
                        <ShuffleIcon />
                    </span>
                </Button>
                <Button
                    className={clsx(cl.button, cl.button_withIcon)}
                    type='button'
                    onClick={resetCards}
                    disabled={!data.isShuffled}
                >
                    <span>Восстановить</span>
                    <span>
                        <LucideRotateCcw />
                    </span>
                </Button>
                <Button
                    className={cl.button}
                    type='button'
                    onClick={showNextCard}
                >
                    Вперед
                </Button>
            </div>
        </section>
    )
}
