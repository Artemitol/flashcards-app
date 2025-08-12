import { PreloadDataState } from "@shared/model/store"
import { DataToPrefetchConfig } from "../config/data-to-prefetch"

export async function prefetchData() {
    const arr = DataToPrefetchConfig.map((el) => el())
    const data = await Promise.allSettled(arr)

    return data
}
