export function shuffleArray<T = unknown>(arr: T[]): T[] {
    const draftArray= [ ...arr ]

    for (let i = draftArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))

        ;[draftArray[i], draftArray[j]] = [draftArray[j], draftArray[i]]
    }
    return draftArray
}
