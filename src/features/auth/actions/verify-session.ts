"use server"

import { sessionService } from "@entities/user/server"
import { redirect } from "next/navigation"

export const verifySessionAction = async () => {
    const { session } = await sessionService.verifySession()

    if (session.type === "left") {
        redirect("/authorization")
    }
}
