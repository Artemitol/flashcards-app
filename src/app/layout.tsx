import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import StoreProvider from "@shared/ui/store-provider"

export default function AppNextLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <head>
                <title>Flip Master</title>
            </head>
            <body>
                <Theme>
                    <StoreProvider>{children}</StoreProvider>
                </Theme>
            </body>
        </html>
    )
}
