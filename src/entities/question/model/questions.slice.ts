import { createSelector, createSlice } from "@reduxjs/toolkit"
import { QuestionModel } from "./domain/question"
import { shuffleArray } from "@shared/lib/shuffle"
import { appReducer } from "@shared/model/store"
// import { QuestionCardsConfig } from "../config/questions-config"

type State = {
    sourceOfTruth: QuestionModel[]
    cards: QuestionModel[]
    isShuffled: boolean
    currentCardIndex: number | null
    currentCard: QuestionModel | null
}

const initialState: State = {
    sourceOfTruth: [],
    cards: [],
    isShuffled: false,
    currentCardIndex: null,
    currentCard: null,
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
    },
}).injectInto(appReducer)

export const { actions: questionActions, selectors: questionSelectors } =
    questionsSlice
