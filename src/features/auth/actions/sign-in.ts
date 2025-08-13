"use server"

import { z } from "zod"
import { FormState } from "../model/domain"
import { sessionService, verifyUserPassword } from "@entities/user/server"
import { redirect } from "next/navigation"

const formDataSchema = z.object({
    login: z.string(),
    password: z.string(),
})

export async function signInAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const objectFormData = Object.fromEntries(formData.entries())
    const parsedData = formDataSchema.safeParse(objectFormData)

    // Validating form
    if (!parsedData.success) {
        const { login: loginError, password: passwordError } =
            parsedData.error.flatten().fieldErrors

        return {
            formData,
            errors: {
                login: loginError?.join(", "),
                password: passwordError?.join(", "),
            },
        } as FormState
    }

    const verification = await verifyUserPassword({
        login: parsedData.data.login,
        password: parsedData.data.password,
    })

    if (verification.type === "right") {
        await sessionService.createSession({
            userId: verification.value.id,
            username: verification.value.username,
        })

        redirect("/tasks")
    }

    return {
        errors: {},
        formData,
        message: verification.error.split("-").join(" "),
    } as FormState
}
