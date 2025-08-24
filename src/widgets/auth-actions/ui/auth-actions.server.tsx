import "server-only"

import { verifyUser } from "@features/auth/verify-user/server"

import { AuthActions } from "./auth-actions"

export async function AuthActionsServer() {
    const session = await verifyUser()

    return <AuthActions session={session} />
}
