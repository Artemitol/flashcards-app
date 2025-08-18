import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { dbClient } from "@shared/model/db/connection"
import { questions } from "@shared/model/db/schema"

export type QuestionDB = InferSelectModel<typeof questions>
export type QuestionInsertDB = InferInsertModel<typeof questions>
export type QuestionInsertNoSensitiveDB = Omit<
    QuestionInsertDB,
    "id" | "createdAt"
>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const questionWithRelationsEjector = async () => {
    return await dbClient.query.questions.findFirst({
        with: {
            creator: true,
            tags: {
                with: {
                    tag: true,
                },
            },
        },
    })
}
export type QuestionWithRelationsDB = NonNullable<
    Awaited<ReturnType<typeof questionWithRelationsEjector>>
>
