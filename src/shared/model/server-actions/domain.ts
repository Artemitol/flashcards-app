export type FormState<T extends object> = {
    formData: FormData | null
    message?: string | null
    errors: T
}
