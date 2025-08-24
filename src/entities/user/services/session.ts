import "server-only"

import { SignJWT, jwtVerify } from "jose"
import { SessionPayload } from "../domain/model"
import { cookies } from "next/headers"
import { left, right } from "@shared/lib/either"
import { SESSION_EXPIRATION_MS, SESSION_SECRET } from "@shared/config/security"

const secretSessionKey = SESSION_SECRET
const encodedSecretKey = new TextEncoder().encode(secretSessionKey)

async function encrypt(payload: SessionPayload) {
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256",
        })
        .setExpirationTime(Date.now() + Number(SESSION_EXPIRATION_MS))
        .setIssuedAt()
        .sign(encodedSecretKey)

    return jwt
}

async function decrypt(session: string = "") {
    try {
        const decryptedSession = await jwtVerify(session, encodedSecretKey, {
            algorithms: ["HS256"],
        })

        return right(decryptedSession.payload as SessionPayload)
    } catch (err) {
        return left("bad-session")
    }
}

async function createSession(sessionPayload: SessionPayload) {
    const expiresAt = new Date(Date.now() + SESSION_EXPIRATION_MS)
    const encryptedSession = await encrypt(sessionPayload)
    const cookieStore = await cookies()

    cookieStore.set("session", encryptedSession, {
        httpOnly: true,
        // secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    })
}

async function deleteSession() {
    const cookieStore = await cookies()

    cookieStore.delete("session")
}

const getSessionCookies = async () => {
    const cookieStore = await cookies()

    return cookieStore.get("session")
}

async function refreshSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")?.value
    const payload = await decrypt(session)

    // User accessed app before token expiration, so refreshing
    if (payload.type === "right") {
        await deleteSession()
        await createSession({
            userId: payload?.value.userId,
            username: payload.value.username,
            email: payload.value.email,
        })
    }
}

async function verifySession() {
    const cookies = await getSessionCookies()
    const session = await decrypt(cookies?.value)

    return { session: session }
}

async function getSession() {
    const { session } = await verifySession()

    if (session.type === "left") {
        return left("no-correct-session-provided")
    }

    return right(session.value)
}

export const sessionService = {
    deleteSession,
    createSession,
    refreshSession,
    verifySession,
    getSession,
}
