import { PreloadDataState } from "@shared/model/store"

export const DataToPrefetchConfig: ((
    ...args: unknown[]
) => Promise<PreloadDataState>)[] = []
