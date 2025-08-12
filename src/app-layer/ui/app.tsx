import { prefetchData } from "@app-layer/providers/prefetch-data"
import { StoreProvider } from "../providers/store-provider"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

export async function App({ children }: React.PropsWithChildren) {
    const prefetchedData = await prefetchData()

    return (
        <Theme>
            <StoreProvider prefetchedData={prefetchedData}>
                {children}
            </StoreProvider>
        </Theme>
    )
}
