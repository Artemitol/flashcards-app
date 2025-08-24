import { seedQuestions } from "./questions"
import { seedQuiz } from "./quizzes"
import { seedUsers } from "./users"

async function main() {
    await seedUsers()
    await seedQuestions()
    await seedQuiz()

    console.log("✅ Сиды загружены")
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
