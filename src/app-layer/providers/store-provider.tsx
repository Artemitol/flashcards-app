"use client"

import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore, PreloadDataState } from "@shared/model/store"

export function StoreProvider({
    children,
    prefetchedData,
}: {
    children: React.ReactNode
    prefetchedData?: PreloadDataState
}) {
    const storeRef = useRef<AppStore | null>(null)

    if (storeRef.current === null) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore(prefetchedData)
    }

    // eslint-disable-next-line react-hooks/refs
    return <Provider store={storeRef.current}>{children}</Provider>
}
