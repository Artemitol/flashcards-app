"use client"

import { useActionState, useId } from "react"
import { loginAction } from "../actions/log-in"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@shared/ui/dialog"
import { Button, PasswordInput } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { Label } from "@shared/ui/label"

type AuthModalProps = {
    trigger?: React.ReactNode
}

export function LoginModal({ trigger }: AuthModalProps) {
    const [state, action, isPending] = useActionState(loginAction, {
        errors: {},
        formData: null,
        message: null,
    })
    const loginId = useId()

    return (
        <Dialog>
            <DialogTrigger asChild disabled={isPending}>
                {trigger || <Button>Login</Button>}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <form action={action} className='contents'>
                    <DialogHeader>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                            Enter your credentials down below, if you have
                            account and send them
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4'>
                        <div className='grid gap-3'>
                            <Label htmlFor={loginId}>Login</Label>
                            <Input
                                id={loginId}
                                name='login'
                                placeholder='Your email...'
                                defaultValue={state.formData
                                    ?.get("login")
                                    ?.toString()}
                            />
                            {state?.errors.login && (
                                <p className='text-rose-700'>
                                    {state.errors.login}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-3'>
                            <PasswordInput
                                name='password'
                                placeholder='Your password...'
                                defaultValue={state.formData
                                    ?.get("password")
                                    ?.toString()}
                            />
                            {state?.errors.password && (
                                <p className='text-rose-700'>
                                    {state.errors.password}
                                </p>
                            )}
                        </div>
                    </div>
                    {state.message && (
                        <p className='text-rose-700'>{state.message}</p>
                    )}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button type='submit' disabled={isPending}>
                            Login
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
