import { Button } from "@shared/ui/button"
import { useActionState } from "react"
import { logOutAction } from "../actions/log-out"

export function LogOutButton() {
    const [_, action, isPending] = useActionState(logOutAction, new FormData())

    return (
        <form action={action} className='contents'>
            <Button disabled={isPending}>Log out</Button>
        </form>
    )
}
