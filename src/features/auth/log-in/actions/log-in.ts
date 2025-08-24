"use server"

import { z } from "zod"
import { LoginFormState } from "../model/domain"
import { sessionService, verifyUserPassword } from "@entities/user/server"

const formDataSchema = z.object({
    login: z.string(),
    password: z.string(),
})

export async function loginAction(
    prevState: LoginFormState,
    formData: FormData
): Promise<LoginFormState> {
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
        } satisfies LoginFormState
    }

    const verification = await verifyUserPassword({
        login: parsedData.data.login,
        password: parsedData.data.password,
    })

    if (verification.type === "right") {
        await sessionService.createSession({
            userId: verification.value.id,
            username: verification.value.username,
            email: verification.value.email,
        })

        return {
            errors: {},
            formData,
            message: null,
        }
    }

    return {
        errors: {},
        formData,
        message: verification.error.split("-").join(" "),
    } satisfies LoginFormState
}
