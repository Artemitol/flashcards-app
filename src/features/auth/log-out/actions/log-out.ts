"use server"

import { sessionService } from "@entities/user/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function logOutAction(prevState: unknown, state: FormData) {
    await sessionService.deleteSession()

    revalidatePath("/", "layout")

    return state
}
