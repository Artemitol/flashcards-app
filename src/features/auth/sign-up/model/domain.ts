import { FormState } from "@shared/model/server-actions"

export type SignUpFormState = FormState<{
    username?: string
    email?: string
    password?: string
}>
