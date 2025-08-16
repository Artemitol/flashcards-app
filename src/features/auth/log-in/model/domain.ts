import { FormState } from "@shared/model/server-actions"

export type LoginFormState = FormState<{
    login?: string
    password?: string
}>
