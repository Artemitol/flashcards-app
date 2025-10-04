import { QuestionModel } from "@entities/question"
import { quizSliceActions, quizSliceSelectors } from "@entities/quiz"
import { useAppStore, useAppDispatch, useAppSelector } from "@shared/lib/redux"
import { useEffect } from "react"

type UseQuizOptions = {
    quizId: number
    questions: QuestionModel[]
}

export function useQuiz({ questions, quizId }: UseQuizOptions) {
    const dispatch = useAppDispatch()
    const store = useAppStore()
    const currentCard = useAppSelector((state) =>
        quizSliceSelectors.currentCard(state, quizId)
    )

    useEffect(() => {
        if (!quizSliceSelectors.byId(store.getState(), quizId).isIdle) {
            dispatch(quizSliceActions.firstFetch(quizId))
            dispatch(
                quizSliceActions.setQuestions({
                    questions,
                    quizId,
                })
            )
        }
    }, [dispatch, questions, quizId, store])

    return { currentCard }
}
