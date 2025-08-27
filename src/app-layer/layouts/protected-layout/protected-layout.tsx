import "server-only"

import { redirect } from "next/navigation"
import { verifyUser } from "@features/auth/verify-user/server"

type ProtectedLayoutProps = React.PropsWithChildren

export async function ProtectedLayout(props: ProtectedLayoutProps) {
    const { children } = props

    const req = await verifyUser()

    if (req.type === "left") {
        redirect("/forbidden")
    }

    return children
}
