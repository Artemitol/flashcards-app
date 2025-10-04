"use server"

import { FormState } from "@shared/model/server-actions"
import z from "zod"
import { getUserService, sessionService } from "@entities/user/server"
import { questionRepository } from "@entities/question/repositories/question-repository"
import { revalidateTag } from "next/cache"
import { QuestionCaching } from "@entities/question/server"

type ActionState = FormState<{
    question?: string[]
    answer?: string[]
}> & {
    isSuccess: boolean | null
}

const createNewQuestionSchema = z.object({
    question: z.string().max(200),
    answer: z.string().max(500),
})

export async function createNewQuestionAction(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const formObject = Object.fromEntries(formData.entries())
    const validationResult = createNewQuestionSchema.safeParse(formObject)

    if (!validationResult.success) {
        const { fieldErrors } = z.flattenError(validationResult.error)

        return {
            formData,
            errors: {
                ...fieldErrors,
            },
            isSuccess: false,
            message: "Check inserted data and try again",
        }
    }

    const { data: validatedData } = validationResult

    const { session } = await sessionService.verifySession()

    if (session.type === "left") {
        return {
            errors: {},
            formData,
            message: "Cant create question because you aren`t authorized",
            isSuccess: false,
        }
    }
    const user = await getUserService.byId(session.value.userId)

    if (user.type === "left") {
        return {
            formData,
            errors: {},
            message:
                "Cant found data about you. You should logout, login and try again",
            isSuccess: false,
        }
    }

    const req = await questionRepository.insertOne({
        ...validatedData,
        creatorId: user.value.id,
    })

    if (req.type === "left") {
        return {
            formData,
            errors: {},
            message: "Something went wrong, try again later",
            isSuccess: false,
        }
    }

    if (req.type === "right") {
        revalidateTag(QuestionCaching.baseKey)

        return {
            isSuccess: true,
            errors: {},
            formData: new FormData(),
            message: null,
        }
    }

    return {
        errors: prevState.errors,
        formData,
        message: prevState.message,
        isSuccess: null,
    }
}
