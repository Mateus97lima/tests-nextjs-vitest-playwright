import { revalidatePath } from "next/cache"
import { deleteTodoUseCase } from "../usecases/delete-todo-usecase"

export async function deleteTodoAction (id: string) {
'use server'

const Result = await deleteTodoUseCase(id)

if(Result.success){
    revalidatePath("/")
}

return Result;
}