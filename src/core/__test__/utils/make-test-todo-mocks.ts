import { MakeInválido, MakeVálido } from "@/core/todo/schemas/todo.contract"
import * as createTodoUseCaseMod  from "@/core/todo/usecases/create-todo.usecase"
import * as revalidatePathMocked  from "next/cache"
import * as deleteTodoUseCaseMod  from "@/core/todo/usecases/delete-todo-usecase";
import { revalidatePath } from "next/cache";

export const makeTestTodoMocks = () => {

    const successResult = {
    success:true,
    todo:{
        id:'any-id',
        description:'any-description',
        createdAt:new Date().toISOString(),
    }
    } as MakeVálido

    const errorResult = {
    success:false,
    errors: ['error']
    } as MakeInválido 
    

    const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, "createTodoUseCase").mockResolvedValue(successResult)

    const deleteTodoUseCaseSpy = vi.spyOn(deleteTodoUseCaseMod, 'deleteTodoUseCase').mockResolvedValue(successResult)

    const revalidatePathMocked = vi.mocked(revalidatePath)
    return {
        createTodoUseCaseSpy,
        deleteTodoUseCaseSpy,
        revalidatePathMocked,
        errorResult,
        successResult,
    }
}



