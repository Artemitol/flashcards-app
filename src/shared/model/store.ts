import { combineSlices, configureStore } from "@reduxjs/toolkit"

export const appReducer = combineSlices()

export const makeStore = (preloadedState?: PreloadDataState) =>
    configureStore({
        reducer: appReducer,
        preloadedState,
    })

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appReducer>
export type AppDispatch = AppStore["dispatch"]
export type PreloadDataState = Partial<RootState>
