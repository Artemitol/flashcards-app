"use client"

import { createQuizAction } from "../../actions/create-quiz"
import { QuestionModel } from "@entities/question"
import { Button } from "@shared/ui/button"
import { Input } from "@shared/ui/input"
import { MultiSelect, MultiSelectOption } from "@shared/ui/multi-select"
import { useActionState, useId, useMemo } from "react"
import { FormItem } from "@shared/ui/form-item"
import cl from "./create-quiz-form.module.scss"
import { Textarea } from "@shared/ui/textarea"

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
    const quizId = useId()

    const questionOptions: MultiSelectOption[] = useMemo(() => {
        const draft: MultiSelectOption[] =
            questions?.map((question) => ({
                value: question.id.toString(),
                label: question.question,
            })) || []

        return draft
    }, [questions])

    return (
        <form action={action} className={cl.createQuizForm}>
            <FormItem
                labelText={
                    <label
                        htmlFor={`${quizId}-name`}
                        className={cl.createQuizForm__label}
                    >
                        Name
                    </label>
                }
                errorText={formState.errors.name}
                inputElement={
                    <Input
                        id={`${quizId}-name`}
                        name='name'
                        defaultValue={formState.formData
                            ?.get("name")
                            ?.toString()}
                        placeholder='Your amazing quiz name...'
                    />
                }
            />
            <FormItem
                labelText={
                    <label
                        htmlFor={`${quizId}-description`}
                        className={cl.createQuizForm__label}
                    >
                        Description
                    </label>
                }
                errorText={formState.errors.description}
                inputElement={
                    <Textarea
                        id={`${quizId}-description`}
                        name='description'
                        defaultValue={formState.formData
                            ?.get("description")
                            ?.toString()}
                        placeholder='This quiz is for...'
                    />
                }
            />
            {questions && (
                <FormItem
                    labelText={
                        <label
                            htmlFor={`${quizId}-questions`}
                            className={cl.createQuizForm__label}
                        >
                            Questions for quiz
                        </label>
                    }
                    errorText={formState.errors.questions}
                    inputElement={
                        <MultiSelect
                            placeholder='Your questions that will be asked...'
                            id={`${quizId}-questions`}
                            name='questions'
                            options={questionOptions}
                            defaultValue={formState.formData
                                ?.getAll("questions")
                                .map(String)}
                            disabled={isDisabled}
                        />
                    }
                />
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
