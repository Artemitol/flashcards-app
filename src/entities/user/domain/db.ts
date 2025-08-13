import "server-only"

import { users } from "@shared/model/db/server"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"

export type UserDB = InferSelectModel<typeof users>
export type CreateUserDB = InferInsertModel<typeof users>
