"use client"

import { useActionState, useId } from "react"
import { Button } from "@shared/ui/button"
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
import { Input } from "@shared/ui/input"
import { Label } from "@shared/ui/label"
import { createNewQuestionAction } from "../actions/create-new-question"
import clsx from "clsx"
import { Plus } from "lucide-react"

type CreateNewQuestionProps = React.PropsWithChildren & {
    trigger?: React.ReactNode
    dialogClassname?: string
    cancelText?: string
    cancelRender?: string
    acceptText?: string
    acceptRender?: string
}

export function CreateNewQuestion(props: CreateNewQuestionProps) {
    const {
        children = "Create question",
        trigger,
        acceptRender,
        acceptText,
        cancelRender,
        cancelText,
        dialogClassname,
    } = props

    const [state, action, isPending] = useActionState(createNewQuestionAction, {
        errors: {},
        formData: null,
        message: null,
    })
    const questionId = useId()
    const answerId = useId()

    return (
        <Dialog>
            <DialogTrigger asChild disabled={isPending}>
                {trigger || (
                    <Button>
                        <Plus />
                        {children}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                className={clsx("sm:max-w-[425px]", dialogClassname)}
            >
                <form action={action} className='contents'>
                    <DialogHeader>
                        <DialogTitle>Create new question</DialogTitle>
                        <DialogDescription>
                            Enter data that will be in your question
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4'>
                        <div className='grid gap-3'>
                            <Label htmlFor={questionId}>
                                Question that will be asked
                            </Label>
                            <Input
                                id={questionId}
                                name='question'
                                placeholder='Your question prompt...'
                                defaultValue={state.formData
                                    ?.get("question")
                                    ?.toString()}
                            />
                            {state?.errors.question && (
                                <p className='text-rose-700'>
                                    {state.errors.question.join(", ")}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor={answerId}>
                                Answer on your question
                            </Label>
                            <Input
                                id={answerId}
                                name='answer'
                                placeholder='Your answer...'
                                defaultValue={state.formData
                                    ?.get("answer")
                                    ?.toString()}
                            />
                            {state?.errors.answer && (
                                <p className='text-rose-700'>
                                    {state.errors.answer.join(", ")}
                                </p>
                            )}
                        </div>
                    </div>
                    {state.message && (
                        <p className='text-rose-700'>{state.message}</p>
                    )}
                    <DialogFooter>
                        <DialogClose asChild>
                            {cancelRender || (
                                <Button variant='outline'>
                                    {cancelText || "Cancel"}
                                </Button>
                            )}
                        </DialogClose>
                        {acceptRender ? (
                            <Button
                                type='submit'
                                isLoading={isPending}
                                disabled={isPending}
                                asChild
                            >
                                {acceptRender}
                            </Button>
                        ) : (
                            <Button
                                type='submit'
                                isLoading={isPending}
                                disabled={isPending}
                            >
                                {acceptText || "Create question"}
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
