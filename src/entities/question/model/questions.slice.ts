import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { QuestionModel } from "./domain/question"
import { shuffleArray } from "@shared/lib/shuffle"
import { appReducer } from "@shared/model/store"

type State = {
    sourceOfTruth: QuestionModel[]
    cards: QuestionModel[]
    isShuffled: boolean
    currentCardIndex: number | null
    currentCard: QuestionModel | null
    isIdle: boolean
}

const initialState: State = {
    sourceOfTruth: [],
    cards: [],
    isShuffled: false,
    currentCardIndex: null,
    currentCard: null,
    isIdle: false,
}

export const questionsSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        showNext: (state) => {
            if (state.currentCardIndex === null) {
                return
            }

            const len = state.cards.length
            const incrementedId = state.currentCardIndex + 1

            // Overflow resets cursor to the start of the list
            const newIndex = incrementedId % len

            state.currentCardIndex = newIndex
            state.currentCard = state.cards[newIndex]
        },
        showPrevious: (state) => {
            if (state.currentCardIndex === null) {
                return
            }

            const len = state.cards.length
            const decrementedId = state.currentCardIndex - 1

            // Overflow resets cursor to the end of the list
            const newId = decrementedId < 0 ? len - 1 : decrementedId

            state.currentCardIndex = newId
            state.currentCard = state.cards[newId]
        },
        shuffle: (state) => {
            const shuffledArr = shuffleArray(state.sourceOfTruth)

            state.cards = shuffledArr
            state.currentCard =
                state.currentCardIndex !== null
                    ? shuffledArr[state.currentCardIndex]
                    : null
            state.isShuffled = true
        },
        reset: (state) => {
            const newIndex = state.currentCardIndex !== null ? 0 : null

            state.cards = [...state.sourceOfTruth]
            state.currentCardIndex = newIndex
            state.isShuffled = false
            state.currentCard =
                newIndex !== null ? state.sourceOfTruth[newIndex] : null
        },
        firstFetch: (state) => {
            state.isIdle = true
        },
        setQuestions: (state, action: PayloadAction<QuestionModel[]>) => {
            const { payload } = action

            state.isShuffled = false
            state.sourceOfTruth = payload
            state.cards = payload
            state.currentCardIndex = action.payload.length === 0 ? null : 0
            state.currentCard =
                action.payload.length === 0 ? null : action.payload[0]
        },
    },
    selectors: {
        all: (state) => state,
        cardsAmount: (state) => state.sourceOfTruth.length,
        currentNumber: createSelector(
            (state: State) => state.currentCardIndex,
            (index) => {
                if (index !== null) {
                    return index + 1
                } else {
                    return 0
                }
            }
        ),
        currentCard: (state) => state.currentCard,
        isIdle: (state) => state.isIdle,
    },
}).injectInto(appReducer)

export const { actions: questionActions, selectors: questionSelectors } =
    questionsSlice
