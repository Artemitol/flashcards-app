import { AppLayout } from "@app-layer/layouts/app-layout"

export default function UsableAppNextLayout({
    children,
}: React.PropsWithChildren) {
    return <AppLayout>{children}</AppLayout>
}
