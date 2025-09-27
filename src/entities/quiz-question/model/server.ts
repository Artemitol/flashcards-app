import { quizQuestions } from "@shared/model/db/schema"
import { InferSelectModel } from "drizzle-orm"

export type QuizQuestionDB = InferSelectModel<typeof quizQuestions>
