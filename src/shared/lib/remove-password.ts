export const removePassword = <T extends { password: string }>({
    password,
    ...rest
}: T): Omit<T, "password"> => rest
