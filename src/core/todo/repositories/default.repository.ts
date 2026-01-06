import { drizzleDatabase } from "@/db";
import { DrizzleTodoRepository } from "./drizzle.todo.repository";
import { TodoContractRepository } from "./todo.contract.repository";

export const todoRepository: TodoContractRepository = new DrizzleTodoRepository(drizzleDatabase.db);

