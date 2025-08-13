import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useUrl() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())

            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const update = useCallback(
        (name: string, value: string) => {
            router.push(pathname + "?" + createQueryString(name, value))
        },
        [pathname, createQueryString, router]
    )

    const get = useCallback(
        (name: string) => searchParams.get(name),
        [searchParams]
    )

    return {
        pushParameter: update,
        getParameter: get,
    }
}
