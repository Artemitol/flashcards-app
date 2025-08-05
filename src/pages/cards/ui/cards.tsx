import clsx from "clsx"
import { useQuestionCards } from "../lib/use-question-cards"
import cl from "./cards.module.scss"
import { Progress } from "@shared/ui/progress"
import { Card } from "@entities/card"
import { ResetIcon, ShuffleIcon } from "@radix-ui/react-icons"
import { Button } from "@shared/ui/button"

export function CardsPage() {
    const { data, resetCards, showNextCard, showPreviousCard, shuffleCards} =
        useQuestionCards()

    return (
        <section className={cl.cardsPage}>
            <div className={cl.cardsPage__header}>
                <div className={clsx(cl.cardPage__counter, cl.counter)}>
                    <span>{data.currentCardIndex + 1}</span>
                    <span>из</span>
                    <span>{data.sourceOfTruth.length}</span>
                </div>
                <Progress
                    className={cl.cardsPage__progress}
                    value={
                        ((data.currentCardIndex + 1) / data.sourceOfTruth.length) * 100
                    }
                />
            </div>
            <div className={cl.cardsPage__cardWrapper}>
                <Card card={data.currentCard} />
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
                        <ResetIcon />
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
