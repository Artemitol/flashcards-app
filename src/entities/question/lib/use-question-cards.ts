import { questionActions, questionSelectors } from "@entities/question"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

export function useQuestionCards() {
    const dispatch = useDispatch()
    const data = useSelector(questionSelectors.all)
    const currentNumber = useSelector(questionSelectors.currentNumber)
    const maxAmount = useSelector(questionSelectors.cardsAmount)

    const showNextCard = useCallback(() => {
        dispatch(questionActions.showNext())
    }, [dispatch])

    const showPreviousCard = useCallback(() => {
        dispatch(questionActions.showPrevious())
    }, [dispatch])

    const shuffleCards = useCallback(() => {
        dispatch(questionActions.shuffle())
    }, [dispatch])

    const resetCards = useCallback(() => {
        dispatch(questionActions.reset())
    }, [dispatch])

    return {
        data,
        showNextCard,
        showPreviousCard,
        shuffleCards,
        resetCards,
        currentNumber,
        maxAmount,
    }
}
