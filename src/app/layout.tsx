import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"

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
                <Theme>{children}</Theme>
            </body>
        </html>
    )
}
