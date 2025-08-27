import { QuestionId } from "@kernel/ids"

export const QuestionCaching = {
    baseKey: "question",

    // List
    listCacher: ["question", "list"],
    listAccessor: "question:list",

    // ById
    byIdCacher: ["question", "byId"],
    byIdAccessor: (id: QuestionId) => `question:byId:${id}`,
}
