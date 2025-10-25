export const experimental_ppr = true

import { StoreProvider } from "../providers/store-provider"
import { ThemeProvider } from "../providers/theme-provider"
import "./index.css"
import "./globals.scss"
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
                {children}
                <Toaster />
            </StoreProvider>
        </ThemeProvider>
    )
}
