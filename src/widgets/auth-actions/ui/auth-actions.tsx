"use client"

import { LoginModal } from "@features/auth/log-in"
import { SignUpModal } from "@features/auth/sign-up"
import { Button } from "@shared/ui/button"
import cl from "./auth-actions.module.scss"
import { NavUser } from "@shared/ui/nav-user"
import { SessionPayload } from "@entities/user"
import { Either } from "@shared/lib/either"
import { LogOutButton } from "@features/auth/log-out"

export function AuthActions({
    session,
}: {
    session: Either<unknown, SessionPayload>
}) {
    if (session.type === "left") {
        return (
            <div className={cl.authActions}>
                <LoginModal />
                <SignUpModal
                    trigger={<Button variant='secondary'>Sign Up</Button>}
                />
            </div>
        )
    }

    return (
        <NavUser
            user={{
                name: session.value.username,
                email: session.value.email || undefined,
            }}
            logoutTrigger={<LogOutButton />}
        />
    )
}
