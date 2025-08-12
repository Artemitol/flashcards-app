import { StoreProvider } from "../providers/store-provider"
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

export async function App({ children }: React.PropsWithChildren) {

    return (
        <Theme>
            <StoreProvider>{children}</StoreProvider>
        </Theme>
    )
}
