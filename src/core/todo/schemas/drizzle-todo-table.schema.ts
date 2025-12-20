import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoTableSchema = sqliteTable('todo', {
    id: text('id').primaryKey(),
    description: text('description').notNull().unique(),
    createdAt: text('created_At').notNull(),

});

export type TodoTableSelectModel = InferSelectModel<typeof todoTableSchema>   // caso eu queira usar //
export type TodoTableInsertModel = InferInsertModel<typeof todoTableSchema>