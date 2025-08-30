import { QuizId } from "@kernel/ids"

export const QuizCachingConfig = {
    baseKey: "quiz",

    // List
    listCacher: ["quiz", "list"],
    listAccessor: "quiz:list",

    // ById
    byIdCacher: ["quiz", "byId"],
    byIdAccessor: (id: QuizId) => `quiz:byId:${id}`,
}
