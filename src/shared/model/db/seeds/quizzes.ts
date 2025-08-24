import { dbClient } from "../connection"
import { quizQuestions, quizzes } from "../schema"

export const seedQuiz = async () => {
    const [quiz] = await dbClient
        .insert(quizzes)
        .values({
            title: "Mock frontend",
            description: "for frontend bla bla bla",
            creatorId: 1,
        })
        .returning()

    await dbClient.insert(quizQuestions).values(
        Array.from({ length: 51 }, (_, index) => ({
            quizId: quiz.id,
            questionId: index + 1,
        }))
    )
}
