"use client"

import { useActionState, useEffect, useId, useState } from "react"
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
import { createQuizAction } from "../actions/create-quiz"
import clsx from "clsx"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { QuestionModel } from "@entities/question"
import { Textarea } from "@shared/ui/textarea"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@shared/ui/command"
import { DialogTriggerProps } from "@radix-ui/react-dialog"

type CreateNewQuestionProps = DialogTriggerProps &
    React.PropsWithChildren & {
        questions?: QuestionModel[]
        trigger?: React.ReactNode
        dialogClassname?: string
        cancelText?: string
        cancelRender?: string
        acceptText?: string
        acceptRender?: string
    }

export function CreateNewQuestionModal(props: CreateNewQuestionProps) {
    const {
        children = "Create quiz",
        trigger,
        acceptRender,
        acceptText,
        cancelRender,
        cancelText,
        dialogClassname,
        questions,
        ...rest
    } = props

    const [state, action, isPending] = useActionState(createQuizAction, {
        errors: {},
        formData: null,
        message: null,
        isSuccess: null,
    })
    const createQuestionId = useId()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (state.isSuccess) {
            toast("Successfully created new quiz")
            setIsModalOpen(false)
        } else if (state.isSuccess === false) {
            toast.error("Something went wrong while creating quiz")
        }
    }, [state.isSuccess])

    return (
        <Dialog
            open={isModalOpen}
            onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
        >
            <DialogTrigger asChild disabled={isPending || !questions} {...rest}>
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
                        <DialogTitle>Create new quiz</DialogTitle>
                        <DialogDescription>
                            Enter data that will be in your quiz
                        </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4'>
                        <div className='grid gap-3'>
                            <Label htmlFor={`${createQuestionId}:name`}>
                                Quiz title
                            </Label>

                            <Input
                                id={`${createQuestionId}:name`}
                                name='name'
                                placeholder='Your quiz title...'
                                defaultValue={state.formData
                                    ?.get("name")
                                    ?.toString()}
                            />

                            {state?.errors.name && (
                                <p className='text-rose-700'>
                                    {state.errors.name.join(", ")}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor={`${createQuestionId}:description`}>
                                Description
                            </Label>

                            <Textarea
                                id={`${createQuestionId}:description`}
                                name='description'
                                placeholder='Description of your quiz...'
                                defaultValue={state.formData
                                    ?.get("description")
                                    ?.toString()}
                            />

                            {state?.errors.description && (
                                <p className='text-rose-700'>
                                    {state.errors.description.join(", ")}
                                </p>
                            )}
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor={`${createQuestionId}:questions`}>
                                Questions
                            </Label>

                            {/* <Select
                                id={`${createQuestionId}:questions`}
                                name='questions'
                                placeholder='Questions for your quiz...'
                                defaultValue={state.formData
                                    ?.get("questions")
                                    ?.toString()}
                            /> */}

                            {/* <Select>
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder='Questions for your quiz...' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='light'>Light</SelectItem>
                                    <SelectItem value='dark'>Dark</SelectItem>
                                    <SelectItem value='system'>
                                        System
                                    </SelectItem>
                                </SelectContent>
                            </Select> */}

                            <Command>
                                <CommandInput placeholder='Type a command or search...' />
                                <CommandList>
                                    <CommandEmpty>
                                        No results found.
                                    </CommandEmpty>
                                    <CommandGroup heading='Suggestions'>
                                        <CommandItem>Calendar</CommandItem>
                                        <CommandItem>Search Emoji</CommandItem>
                                        <CommandItem>Calculator</CommandItem>
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup heading='Settings'>
                                        <CommandItem>Profile</CommandItem>
                                        <CommandItem>Billing</CommandItem>
                                        <CommandItem>Settings</CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>

                            {state?.errors.questions && (
                                <p className='text-rose-700'>
                                    {state.errors.questions.join(", ")}
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
                                {acceptText || "Create quiz"}
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
