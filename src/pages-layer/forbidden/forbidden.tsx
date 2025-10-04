"use client"

import { Typography } from "@shared/ui/typography"
import cl from "./forbidden.module.scss"
import { LoginModal } from "@features/auth/log-in"
import { SignUpModal } from "@features/auth/sign-up"
import { Button } from "@shared/ui/button"

export function ForbiddenPage() {
    return (
        <section className={cl.forbiddenPage}>
            <div className={cl.forbiddenPage__content}>
                <Typography variant='large'>
                    You are not authorized. Login please, and try to visit this
                    page again
                </Typography>

                <div className={cl.forbiddenPage__actions}>
                    <LoginModal trigger={<Button size='lg'>Login</Button>} />
                    <SignUpModal
                        trigger={
                            <Button variant='secondary' size='lg'>
                                Sign up
                            </Button>
                        }
                    />
                </div>
            </div>
        </section>
    )
}
