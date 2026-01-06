import { DrizzleTodoRepository } from "@/core/todo/repositories/drizzle.todo.repository";
import { drizzleDatabase } from "@/db";
import { eq } from "drizzle-orm";

export async function  makeTestRepositoryTodo () {
    const {db, todoTableSchema} = drizzleDatabase; 
const respository = new DrizzleTodoRepository(db);
const todos = makeTestTodos()

const insertTodoDb = () => db.insert(todoTableSchema) // Se precisa retornar algo//
const deleteTodoNoWhere = () => db.delete(todoTableSchema) // Para deletar todos os registros//
const deleteTodoDb = (id: string) => db.delete(todoTableSchema).where(eq(todoTableSchema.id, id))// para deletar um reistro especifico//

return {
    todos,
    respository,
    insertTodoDb,
    deleteTodoNoWhere,
    deleteTodoDb
};
}

export const insertTestTodoDb = async () =>{
    const {insertTodoDb} = await makeTestRepositoryTodo();
    const todos = makeTestTodos()

    await insertTodoDb().values(todos);

    return todos;
}

export const makeTestTodos = () => {
  return Array.from({ length: 5 }).map((_, index) => {
    const newTodo = {
      id: index.toString(),
      description: `Todo ${index}`,
      createdAt: `date ${index}`,
    };

    return newTodo;
  });
};