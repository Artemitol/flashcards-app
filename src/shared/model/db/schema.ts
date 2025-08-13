import {
    pgTable,
    serial,
    varchar,
    text,
    integer,
    timestamp,
    primaryKey,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("user", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 20 }).unique().notNull(),

    email: text("email").unique(),
    password: text("password").notNull(),
    salt: text("salt").notNull(),
    bio: text("bio"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const quizzes = pgTable("quiz", {
    id: serial("id").primaryKey(),

    title: varchar("title", { length: 200 }),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),

    creatorId: integer("creator_id").notNull(),
})

export const questions = pgTable("question", {
    id: serial("id").primaryKey(),

    question: varchar("question", { length: 100 }),
    answer: varchar("answer", { length: 300 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),

    creatorId: integer("creator_id").notNull(),
})

export const tags = pgTable("tag", {
    id: serial("id").primaryKey(),

    name: text("name"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Many to many (quiz <-> question)
export const quizQuestions = pgTable(
    "quiz_question",
    {
        quizId: integer("quiz_id"),
        questionId: integer("question_id"),
    },
    (t) => [primaryKey({ columns: [t.questionId, t.quizId] })]
)

// Many to many (question <-> tags)
export const questionTags = pgTable(
    "question_tag",
    {
        questionId: integer("question_id"),
        tagId: integer("tag_id"),
    },
    (t) => [primaryKey({ columns: [t.questionId, t.tagId] })]
)

// --------Relations--------
export const userRelations = relations(users, ({ many }) => ({
    quizzes: many(quizzes),
    questions: many(questions),
}))

export const quizRelations = relations(quizzes, ({ one, many }) => ({
    creator: one(users, {
        fields: [quizzes.creatorId],
        references: [users.id],
    }),
    quizQuestions: many(quizQuestions),
}))

export const questionRelations = relations(questions, ({ one, many }) => ({
    creator: one(users, {
        fields: [questions.creatorId],
        references: [users.id],
    }),
    tags: many(questionTags),
    quizQuestions: many(quizQuestions),
}))

export const tagRelations = relations(tags, ({ many }) => ({
    questions: many(questionTags),
}))

export const questionTagRelations = relations(questionTags, ({ one }) => ({
    question: one(questions, {
        fields: [questionTags.questionId],
        references: [questions.id],
    }),
    tag: one(tags, {
        fields: [questionTags.tagId],
        references: [tags.id],
    }),
}))

export const quizQuestionRelations = relations(quizQuestions, ({ one }) => ({
    quiz: one(quizzes, {
        fields: [quizQuestions.quizId],
        references: [quizzes.id],
    }),
    question: one(questions, {
        fields: [quizQuestions.questionId],
        references: [questions.id],
    }),
}))
