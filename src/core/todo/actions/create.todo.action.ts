import { revalidatePath } from "next/cache";
import { createTodoUseCase } from "../usecases/create-todo.usecase";



export async function createTodoAction(description: string){
    'use server';

const createResult = await createTodoUseCase(description); // chama a função para criar um TODO

if(createResult.success){
revalidatePath("/todo") // revalida o caminho da página inicial se for bem sucedido
}

return createResult;

}