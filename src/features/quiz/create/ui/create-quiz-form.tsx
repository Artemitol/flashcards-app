"use client"

import { QuestionId } from "@kernel/ids"
import { createQuizAction } from "../actions/create-quiz"
import { QuestionModel } from "@entities/question"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { MultiSelect, MultiSelectOption } from "@shared/ui/multi-select"
import { useActionState, useMemo } from "react"

type CreateQuestionFormProps = {
    questions?: QuestionModel[]
    isDisabled?: boolean
    disabledMessage?: React.ReactNode
}

export function CreateQuizForm(props: CreateQuestionFormProps) {
    const {
        questions,
        isDisabled,
        disabledMessage = "You aren`t able to create quiz",
    } = props

    const [formState, action, isPending] = useActionState(createQuizAction, {
        errors: {},
        formData: null,
        isSuccess: null,
        message: null,
    })

    const questionOptions: MultiSelectOption[] = useMemo(() => {
        const draft: MultiSelectOption[] =
            questions?.map((question) => ({
                value: question.id.toString(),
                label: question.question,
            })) || []

        return draft
    }, [questions])

    return (
        <form
            action={action}
            // action={(formData) => {
            //     const questions = formData.getAll("questions")

            //     formData.set(
            //         "questions",
            //         JSON.stringify(questions?.map(Number) || [])
            //     )

            //     action(formData)
            // }}
        >
            <div>
                <Input
                    name='name'
                    defaultValue={formState.formData?.get("name")?.toString()}
                />
                {formState.errors.name && (
                    <p className='text-rose-500'>{formState.errors.name}</p>
                )}
            </div>
            <div>
                <Input
                    name='description'
                    defaultValue={formState.formData
                        ?.get("description")
                        ?.toString()}
                />
                {formState.errors.description && (
                    <p className='text-rose-500'>
                        {formState.errors.description}
                    </p>
                )}
            </div>
            {questions && (
                <div>
                    <MultiSelect
                        name='questions'
                        options={questionOptions}
                        defaultValue={formState.formData
                            ?.getAll("questions")
                            .map(String)}
                        disabled={isDisabled}
                    />
                    {formState.errors.questions && (
                        <p className='text-rose-500'>
                            {formState.errors.questions}
                        </p>
                    )}
                </div>
            )}
            {formState.message && (
                <p className='text-rose-500'>{disabledMessage}</p>
            )}
            {isDisabled && <p className='text-rose-500'>{disabledMessage}</p>}
            <Button disabled={isDisabled} isLoading={isPending} type='submit'>
                Create quiz
            </Button>
        </form>
    )
}
