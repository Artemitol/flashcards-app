import { QuizId } from "@kernel/ids"

export const QuizCachingConfig = {
    baseKey: "quiz",

    // List
    listCacher: ["quiz", "list"],
    listAccessor: "quiz:list",

    // Admin list
    adminListCacher: ["quiz", "admin", "list"],
    adminListAccessor: "quiz:admin:list",

    // ById
    byIdCacher: ["quiz", "byId"],
    byIdAccessor: (id: QuizId) => `quiz:byId:${id}`,
}
