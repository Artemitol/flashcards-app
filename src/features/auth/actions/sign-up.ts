"use server"

import { z } from "zod"
import { FormState } from "../model/domain"
import { sessionService, createUser } from "@entities/user/server"
import { redirect } from "next/navigation"

const formDataSchema = z.object({
    login: z.string().min(3),
    password: z.string().min(8, "at least 8 characters"),
})

export async function signUpAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const objectFormData = Object.fromEntries(formData.entries())
    const parsedData = formDataSchema.safeParse(objectFormData)

    // Validating form values
    if (!parsedData.success) {
        const { login: loginError, password: passwordError } =
            parsedData.error.flatten().fieldErrors

        return {
            errors: {
                login: loginError?.join(", "),
                password: passwordError?.join(", "),
            },
            formData,
        }
    }

    const newUser = await createUser({
        username: parsedData.data.login,
        password: parsedData.data.password,
    })

    if (newUser.type === "right") {
        // Creating session for new user
        await sessionService.createSession({
            userId: newUser.value.id,
            username: parsedData.data.login,
        })

        redirect("/tasks")
    } else if (
        newUser.type === "left" &&
        newUser.error === "user-already-exists"
    ) {
        return {
            formData,
            message: "User already exists, try to login",
            errors: {},
        }
    }

    return {
        formData,
        message: "Cant sign up right now",
        errors: {},
    }
}
