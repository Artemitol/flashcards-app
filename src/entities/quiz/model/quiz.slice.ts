import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { QuestionModel } from "@entities/question/@x/quiz"
import { shuffleArray } from "@shared/lib/shuffle"
import { appReducer } from "@shared/model/store"
import { QuizId } from "@kernel/ids"

type State = {
    quizzes: Record<QuizId, QuizState | undefined>
}

type QuizState = {
    sourceOfTruth: QuestionModel[]
    cards: QuestionModel[]
    isShuffled: boolean
    currentCardIndex: number | null
    currentCard: QuestionModel | null
    isIdle: boolean | null
}

const initialQuizState: QuizState = {
    sourceOfTruth: [],
    cards: [],
    isShuffled: false,
    currentCardIndex: null,
    currentCard: null,
    isIdle: null,
}

const initialState: State = {
    quizzes: {},
}

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        showNext: (state, action: PayloadAction<QuizId>) => {
            const quizId = action.payload
            const quiz = state.quizzes[quizId] ?? { ...initialQuizState }

            if (quiz.currentCardIndex === null || quiz.cards.length === 0) {
                return
            }

            const newIndex = (quiz.currentCardIndex + 1) % quiz.cards.length
            quiz.currentCardIndex = newIndex
            quiz.currentCard = quiz.cards[newIndex]

            state.quizzes[quizId] = quiz
        },
        showPrevious: (state, action: PayloadAction<QuizId>) => {
            const quizId = action.payload
            const quiz = state.quizzes[quizId] ?? { ...initialQuizState }

            if (quiz.currentCardIndex === null || quiz.cards.length === 0) {
                return
            }

            const newIndex =
                quiz.currentCardIndex - 1 < 0
                    ? quiz.cards.length - 1
                    : quiz.currentCardIndex - 1

            quiz.currentCardIndex = newIndex
            quiz.currentCard = quiz.cards[newIndex]

            state.quizzes[quizId] = quiz
        },
        shuffle: (state, action: PayloadAction<QuizId>) => {
            const quizId = action.payload
            const quiz = state.quizzes[quizId] ?? { ...initialQuizState }

            const shuffledArr = shuffleArray(quiz.sourceOfTruth)
            quiz.cards = shuffledArr
            quiz.currentCard =
                quiz.currentCardIndex !== null
                    ? shuffledArr[quiz.currentCardIndex]
                    : null
            quiz.isShuffled = true

            state.quizzes[quizId] = quiz
        },
        reset: (state, action: PayloadAction<QuizId>) => {
            const quizId = action.payload
            const quiz = state.quizzes[quizId] ?? { ...initialQuizState }

            const newIndex = quiz.sourceOfTruth.length > 0 ? 0 : null
            quiz.cards = [...quiz.sourceOfTruth]
            quiz.currentCardIndex = newIndex
            quiz.currentCard =
                newIndex !== null ? quiz.sourceOfTruth[newIndex] : null
            quiz.isShuffled = false

            state.quizzes[quizId] = quiz
        },
        firstFetch: (state, action: PayloadAction<QuizId>) => {
            const quizId = action.payload
            const quiz = state.quizzes[quizId] ?? { ...initialQuizState }

            quiz.isIdle = true
            state.quizzes[quizId] = quiz
        },
        setQuestions: (
            state,
            action: PayloadAction<{
                quizId: QuizId
                questions: QuestionModel[]
            }>
        ) => {
            const { quizId, questions } = action.payload
            const quiz = state.quizzes[quizId] ?? { ...initialQuizState }

            quiz.isShuffled = false
            quiz.sourceOfTruth = questions
            quiz.cards = questions
            quiz.currentCardIndex = questions.length > 0 ? 0 : null
            quiz.currentCard = questions.length > 0 ? questions[0] : null

            state.quizzes[quizId] = quiz
        },
    },
    selectors: {
        all: (state) => state.quizzes,
        byId: (state, quizId: QuizId) =>
            state.quizzes[quizId] ?? { ...initialQuizState },
        cardsAmount: (state, quizId: QuizId) =>
            state.quizzes[quizId]?.sourceOfTruth.length ?? 0,
        currentNumber: createSelector(
            [
                (state: State, quizId: QuizId) =>
                    state.quizzes[quizId]?.currentCardIndex ?? null,
            ],
            (index) => (index !== null ? index + 1 : 0)
        ),
        currentCard: (state, quizId: QuizId) =>
            state.quizzes[quizId]?.currentCard ?? null,
        isIdle: (state, quizId: QuizId) =>
            state.quizzes[quizId]?.isIdle ?? null,
        isShuffled: (state, quizId: QuizId) =>
            state.quizzes[quizId]?.isShuffled ?? false,
    },
}).injectInto(appReducer)

export const { actions: quizSliceActions, selectors: quizSliceSelectors } =
    quizSlice
