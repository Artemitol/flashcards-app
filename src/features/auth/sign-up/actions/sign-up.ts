"use server"

import { z } from "zod"
import { SignUpFormState } from "../model/domain"
import { sessionService, createUser } from "@entities/user/server"

const formDataSchema = z.object({
    username: z.string().min(3),
    email: z.preprocess(
        (val) =>
            typeof val === "string" && val.trim() !== "" ? val : undefined,
        z.email().optional()
    ),
    password: z.string().min(8, "at least 8 characters"),
})

export async function signUpAction(
    prevState: SignUpFormState,
    formData: FormData
): Promise<SignUpFormState> {
    const objectFormData = Object.fromEntries(formData.entries())
    const parsedData = formDataSchema.safeParse(objectFormData)
    console.log(objectFormData)

    // Validating form values
    if (!parsedData.success) {
        const {
            username: loginError,
            password: passwordError,
            email: emailError,
        } = parsedData.error.flatten().fieldErrors

        return {
            errors: {
                username: loginError?.join(", "),
                email: emailError?.join(", "),
                password: passwordError?.join(", "),
            },
            message: "Please fill all data fields",
            formData,
        }
    }

    const newUser = await createUser({
        username: parsedData.data.username,
        password: parsedData.data.password,
    })

    if (newUser.type === "right") {
        // Creating session for new user
        await sessionService.createSession({
            userId: newUser.value.id,
            username: parsedData.data.username,
            email: parsedData.data.email || null,
        })

        return {
            formData,
            message: null,
            errors: {},
        }
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
