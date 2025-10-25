import "server-only"

import { sessionService } from "@entities/user/server"
import { left, right } from "@shared/lib/either"

export async function verifyUser() {
    const { session } = await sessionService.verifySession()

    if (session.type === "left") {
        return left("unauthorized")
    }

    return right(session.value)
}
