import {
    questionActions,
    QuestionModel,
    questionSelectors,
} from "@entities/question"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export function useQuiz(questions: QuestionModel[]) {
    const dispatch = useDispatch()
    const isIdle = useSelector(questionSelectors.isIdle)
    const currentCard = useSelector(questionSelectors.currentCard)

    useEffect(() => {
        if (isIdle) return

        dispatch(questionActions.firstFetch())
        dispatch(questionActions.setQuestions(questions))
    }, [dispatch, isIdle, questions])

    return { currentCard }
}
