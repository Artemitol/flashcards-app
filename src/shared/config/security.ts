export const SESSION_SECRET = process.env.SESSION_SECRET_KEY!
export const SESSION_EXPIRATION_MS: string = eval(
    process.env.SESSION_EXPIRATION_MS!
)

export const PASSWORDS_SECRET = process.env.PASSWORD_SECRET_KEY!
