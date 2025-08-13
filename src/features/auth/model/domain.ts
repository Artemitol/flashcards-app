export type FormState = {
    formData: FormData | null
    message?: string | null
    errors: {
        login?: string
        password?: string
    }
}
