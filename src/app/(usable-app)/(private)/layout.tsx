import { ProtectedLayout } from "@app-layer/layouts/protected-layout"

export default async function PrivateGroupLayout({
    children,
}: React.PropsWithChildren) {
    return <ProtectedLayout>{children}</ProtectedLayout>
}
