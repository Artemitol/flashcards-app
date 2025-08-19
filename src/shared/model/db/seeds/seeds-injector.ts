import { dbClient } from "../connection"
import { seedQuestions } from "./questions"
import { seedQuiz } from "./quizzes"
import { seedUsers } from "./users"

async function main() {
    await dbClient.transaction(async (tx) => {
        await seedUsers(tx)
        await seedQuestions(tx)
        await seedQuiz(tx)
    })

    console.log("✅ Сиды загружены")
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
