"use server"

import { validateQuestionsExistenceService } from "@entities/question/server"
import {
    QuizQuestionDB,
    quizQuestionsRepository,
} from "@entities/quiz-question/server"
import { QuizCachingConfig, quizRepository } from "@entities/quiz/server"
import { sessionService } from "@entities/user/server"
import { dbClient } from "@shared/model/db/server"
import { FormState } from "@shared/model/server-actions"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import z from "zod"

const questionIdSchema = z
    .int()
    .min(1, "id cannot be equal 0")
    .nonnegative("id cannot be negative number")

const quizFormSchema = z.object({
    name: z.string().min(10, "min 10 symbols").max(200, "max 200 symbols"),
    description: z
        .string()
        .min(100, "min 100 symbols")
        .max(500, "max 500 symbols"),
    questions: z.array(questionIdSchema).min(3, "min 3 questions"),
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
    const dataObj = {
        name: formData.get("name"),
        description: formData.get("description"),
        questions: formData.getAll("questions").map((q) => Number(q)),
    }
    const dataValidationResult = quizFormSchema.safeParse(dataObj)

    console.log(dataObj)

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
    }

    const quizQuestionsRelations: QuizQuestionDB[] = parsedData.questions.map(
        (questionId) => ({
            questionId: questionId,
            quizId: createReq.value.id,
        })
    )

    const relationsReq = await quizQuestionsRepository.insertMany(
        quizQuestionsRelations
    )

    if (relationsReq.type === "left") {
        return {
            message: "cant create quiz now, try later",
            errors: {},
            formData,
            isSuccess: false,
        }
    } else if (relationsReq.type === "right") {
        revalidateTag(QuizCachingConfig.baseKey)
        revalidatePath("/quizzes")
        revalidatePath("/community-quizzes")

        redirect("/quizzes")
    }

    return {
        message: null,
        errors: {},
        formData,
        isSuccess: true,
    }
}
