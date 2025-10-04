export const experimental_ppr = true

import { AppLayout } from "@app-layer/layouts/app-layout"
import { StoreProvider } from "../providers/store-provider"
import { ThemeProvider } from "../providers/theme-provider"
import "./index.css"
import { Toaster } from "@shared/ui/sonner"

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
                <Toaster />
            </StoreProvider>
        </ThemeProvider>
    )
}
