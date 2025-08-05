import { QuestionCardsConfig, type CardModel } from "@entities/card"
import { shuffleArray } from "@shared/lib/shuffle"
import { useCallback, useReducer } from "react"

type Action<T = object> = {
    type: ActionType
    payload?: T
}

type ActionType = "show-next" | "show-previous" | "shuffle" | "reset"

type State = {
    sourceOfTruth: CardModel[]
    cards: CardModel[]
    isShuffled: boolean
    currentCardIndex: number
    currentCard: CardModel
}

function reducer(prevState: State, action: Action): State {
    switch (action.type) {
        case "show-next": {
            const len = prevState.cards.length
            const incrementedId = prevState.currentCardIndex + 1

            // В случае выхода за границу массива перебросит курсор в начало
            const newId = incrementedId % len

            return {
                ...prevState,
                currentCardIndex: newId,
                currentCard: prevState.cards[newId],
            } satisfies State
        }

        case "show-previous": {
            const len = prevState.cards.length
            const decrementedId = prevState.currentCardIndex - 1

            // В случае выхода за границу массива перебросит курсор в конец
            const newId = decrementedId < 0 ? len - 1 : decrementedId

            return {
                ...prevState,
                currentCardIndex: newId,
                currentCard: prevState.cards[newId],
            } satisfies State
        }

        case "shuffle": {
            const shuffledArr = shuffleArray(prevState.sourceOfTruth)

            return {
                ...prevState,
                isShuffled: true,
                cards: [...shuffledArr],
                currentCard: shuffledArr[prevState.currentCardIndex]
            } satisfies State
        }

        case "reset": {
            return {
                ...prevState,
                cards: prevState.sourceOfTruth,
                currentCardIndex: 0,
                currentCard: prevState.sourceOfTruth[0],
                isShuffled: false,
            } satisfies State
        }

        default: {
            action.type satisfies never

            return prevState
        }
    }
}

export function useQuestionCards() {
    const [state, dispatch] = useReducer(reducer, {
        sourceOfTruth: QuestionCardsConfig,
        cards: QuestionCardsConfig,
        currentCardIndex: 0,
        currentCard: QuestionCardsConfig[0],
        isShuffled: false,
    } satisfies State)

    const showNextCard = useCallback(() => {
        dispatch({
            type: "show-next",
        } satisfies Action)
    }, [])

    const showPreviousCard = useCallback(() => {
        dispatch({
            type: "show-previous",
        } satisfies Action)
    }, [])

    const shuffleCards = useCallback(() => {
        dispatch({
            type: "shuffle",
        } satisfies Action)
    }, [])

    const resetCards = useCallback(() => {
        dispatch({
            type: "reset",
        } satisfies Action)
    }, [])

    return {
        showNextCard,
        showPreviousCard,
        shuffleCards,
        resetCards,
        data: state,
    }
}
