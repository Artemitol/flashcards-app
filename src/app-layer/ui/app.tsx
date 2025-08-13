import { AppLayout } from "@app-layer/layouts/app-layout"
import { StoreProvider } from "../providers/store-provider"
import { ThemeProvider } from "../providers/theme-provider"
import "./index.css"

export async function App({ children }: React.PropsWithChildren) {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <StoreProvider>
                <AppLayout>{children}</AppLayout>
            </StoreProvider>
        </ThemeProvider>
    )
}
