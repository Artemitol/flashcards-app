"use client"

import { useActionState, useId } from "react"
import { signUpAction } from "../actions/sign-up"
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

export function SignUpModal({ trigger }: AuthModalProps) {
    const [state, action, isPending] = useActionState(signUpAction, {
        errors: {},
        formData: null,
        message: null,
    })
    const loginId = useId()
    const emailId = useId()

    return (
        <Dialog>
            <DialogTrigger asChild disabled={isPending}>
                {trigger || <Button>Sign In</Button>}
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
                            <Label htmlFor={loginId}>Username</Label>
                            <Input
                                id={loginId}
                                name='username'
                                placeholder='Your username...'
                                defaultValue={state.formData
                                    ?.get("username")
                                    ?.toString()}
                            />
                            {state?.errors.username && (
                                <p className='text-rose-700'>
                                    {state.errors.username}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor={emailId}>Email</Label>
                            <Input
                                id={emailId}
                                name='email'
                                placeholder='Your email...'
                                defaultValue={state.formData
                                    ?.get("email")
                                    ?.toString()}
                            />
                            {state?.errors.email && (
                                <p className='text-rose-700'>
                                    {state.errors.email}
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
                            Sign In
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
