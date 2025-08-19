import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres"
import { quizQuestions, quizzes } from "../schema"
import { PgTransaction } from "drizzle-orm/pg-core"
import * as schema from "../schema"
import { ExtractTablesWithRelations } from "drizzle-orm"

export const seedQuiz = async (
    tx: PgTransaction<
        NodePgQueryResultHKT,
        typeof schema,
        ExtractTablesWithRelations<typeof schema>
    >
) => {
    const [quiz] = await tx
        .insert(quizzes)
        .values({
            title: "Mock frontend",
            description: "for frontend bla bla bla",
            creatorId: 1,
        })
        .returning()

    await tx.insert(quizQuestions).values(
        Array.from({ length: 51 }, (_, index) => ({
            quizId: quiz.id,
            questionId: index + 1,
        }))
    )
}
