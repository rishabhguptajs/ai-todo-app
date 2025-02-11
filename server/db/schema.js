import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const todosTable = pgTable('todos', {
    id: integer().primaryKey(),
    todo: text().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
})