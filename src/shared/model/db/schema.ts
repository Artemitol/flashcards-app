import { relations, sql } from "drizzle-orm"
import {
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/pg-core"

export const users = pgTable(
    "user",
    {
        // Identifiers
        id: serial("id").primaryKey(),
        username: varchar({ length: 20 }).unique(),

        // Data
        email: text("email").unique(),
        password: text("password").notNull(),
        salt: text("salt").notNull(),
        bio: text("bio"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (t) => [uniqueIndex("username_idx").on(t.username)]
)

export const questions = pgTable("question", {
    id: serial("id").primaryKey(),

    // Data
    question: varchar({ length: 100 }),
    answer: varchar({ length: 300 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),

    // Relations
    creatorId: integer("creator_id"),
})

export const questionRelations = relations(questions, ({ one }) => ({
    creator: one(users, {
        fields: [questions.creatorId],
        references: [users.id],
    }),
}))
