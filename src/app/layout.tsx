import { App } from "@app-layer/ui/app"

export default function AppNextLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en' suppressHydrationWarning>
            <head>
                <title>Flip Master</title>
            </head>
            <body>
                <App>{children}</App>
            </body>
        </html>
    )
}
