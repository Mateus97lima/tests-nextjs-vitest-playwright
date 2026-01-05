import { DrizzleDatabase } from "@/db";
import { Todo, TodoPresenter } from "../schemas/todo.contract";
import { TodoContractRepository } from "./todo.contract.repository";
import { todoTableSchema } from "../schemas/drizzle-todo-table.schema";
import { eq } from "drizzle-orm";



export class DrizzleTodoRepository implements TodoContractRepository {

    private readonly db: DrizzleDatabase;

constructor(db: DrizzleDatabase) {
this.db = db;
}

    async findAll(): Promise<Todo[]> {
        return this.db.query.todo.findMany({ // findMany para buscar todos os Todos //
            orderBy: (todo, {desc}) => [desc(todo.createdAt), desc(todo.description)], // ordenando por data de criação e descrição//
        });
    }
    async create(todoData: Todo): Promise<TodoPresenter> {
        const existinTodo = await this.db.query.todo.findFirst({
            where: (todoTable, {eq,or}) => or(eq(todoTable.id, todoData.id), eq(todoTable.description, todoData.description))
        })
        
        if(!!existinTodo) {
            return {
                success: false,
                errors: ['Todo já existe com essa descrição ou ID'],
            }
        }
        
        await this.db.insert(todoTableSchema).values(todoData) // colocado o novo todo na tabela//
        
        return {
            success: true,
            todo: todoData
            
        }
    }
    async remove(id: string): Promise<TodoPresenter> {
          const existinTodo = await this.db.query.todo.findFirst({
            where: (todoTable, {eq}) => eq(todoTable.id, id)
        });

              if(!existinTodo) {  // se o todo não existir//
            return { 
                success: false,
                errors: ['Todo não existe'],
            }

            
        }
         await this.db.delete(todoTableSchema).where(eq(todoTableSchema.id, id)); // deletando o todo da tabela//

         return {
            success: true,
            todo: existinTodo
         }
    }
    
    
}

