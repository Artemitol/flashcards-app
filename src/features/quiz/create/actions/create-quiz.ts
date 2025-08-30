"use server"

import { validateQuestionsExistenceService } from "@entities/question/server"
import { QuizCachingConfig, quizRepository } from "@entities/quiz/server"
import { sessionService } from "@entities/user/server"
import { FormState } from "@shared/model/server-actions"
import { revalidatePath, revalidateTag } from "next/cache"
import z from "zod"

const questionIdSchema = z
    .int()
    .min(1, "id cannot be equal 0")
    .nonnegative("id cannot be negative number")

const quizFormSchema = z.object({
    name: z.string().max(200, "max 200 symbols"),
    description: z.string().max(500, "max 500 symbols"),
    questions: z.array(questionIdSchema),
})

type ActionState = FormState<{
    name?: string[]
    description?: string[]
    questions?: string[]
}> & {
    isSuccess: boolean | null
}

export async function createQuizAction(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const dataObj = Object.fromEntries(formData.entries())
    const dataValidationResult = quizFormSchema.safeParse(dataObj)

    if (!dataValidationResult.success) {
        const err = z.flattenError(dataValidationResult.error)

        return {
            message: null,
            errors: {
                ...err.fieldErrors,
            },
            formData,
            isSuccess: null,
        }
    }

    const parsedData = dataValidationResult.data

    const [questionsValidationPromise, sessionVerificationPromise] =
        await Promise.allSettled([
            validateQuestionsExistenceService(parsedData.questions),
            sessionService.verifySession(),
        ])

    // Unhandled errors
    // this promises should always be resolved as either
    if (
        questionsValidationPromise.status === "rejected" ||
        sessionVerificationPromise.status === "rejected"
    ) {
        return {
            message: "Something went wrong, try later...",
            errors: {},
            formData,
            isSuccess: false,
        }
    }

    const questionsValidation = questionsValidationPromise.value
    const { session: sessionVerification } = sessionVerificationPromise.value

    if (sessionVerification.type === "left") {
        return {
            errors: {},
            formData,
            message: "Authorize to create new quizzes",
            isSuccess: false,
        }
    }

    if (
        questionsValidation.type === "left" &&
        questionsValidation.error === "error-in-request"
    ) {
        return {
            message: "Something went wrong, try later...",
            errors: {},
            formData,
            isSuccess: false,
        }
    } else if (
        questionsValidation.type === "left" &&
        questionsValidation?.error.message === "no-such-questions"
    )
        return {
            message: null,
            errors: {
                questions: ["No such questions, try fill this form again"],
            },
            formData,
            isSuccess: false,
        }
    else if (questionsValidation.type === "left") {
        return {
            message: "Something went wrong, try later...",
            errors: {},
            formData,
            isSuccess: false,
        }
    }

    const createReq = await quizRepository.insertOne({
        title: parsedData.name,
        description: parsedData.description || null,
        creatorId: sessionVerification.value.userId,
    })

    if (createReq.type === "left") {
        return {
            message: "cant create quiz now, try later",
            errors: {},
            formData,
            isSuccess: false,
        }
    } else if (createReq.type === "right") {
        revalidateTag(QuizCachingConfig.baseKey)
        revalidatePath("/quizzes")
        revalidatePath("/community-quizzes")
    }

    return {
        message: null,
        errors: {},
        formData,
        isSuccess: true,
    }
}
