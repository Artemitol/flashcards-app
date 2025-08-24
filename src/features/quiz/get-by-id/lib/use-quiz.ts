import {
    questionActions,
    QuestionModel,
    questionSelectors,
} from "@entities/question"
import { useAppStore } from "@shared/lib/redux"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export function useQuiz(questions: QuestionModel[]) {
    const dispatch = useDispatch()
    const store = useAppStore()
    const currentCard = useSelector(questionSelectors.currentCard)

    useEffect(() => {
        if (!questionSelectors.isIdle(store.getState())) {
            console.log("use-effect-quiz")

            dispatch(questionActions.firstFetch())
            dispatch(questionActions.setQuestions(questions))
        }
    }, [dispatch, questions, store])

    return { currentCard }
}
