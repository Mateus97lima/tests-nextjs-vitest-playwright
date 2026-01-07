
import { revalidatePath } from "next/cache";
import { MakeInválido, MakeVálido } from "../schemas/todo.contract"
import * as createTodoUseCaseMod  from "../usecases/create-todo.usecase"
import { createTodoAction } from "./create.todo.action";

vi.mock('next/cache', () => {
    return {
        revalidatePath: vi.fn(), // mock fazendo nada
    }
});

describe('CreateTodoAction (unit)', () => {
    test('deve chama createTodoUseCase com os valores corretos ', async () => {
    const {createTodoUseCaseSpy} = makeMocks();

    const description = 'any-description';

    await createTodoAction(description);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(description);
    })

    test('deve chama revalidatePath em caso de sucesso ', async () => {
        const {revalidatePathMocked} = makeMocks();
        const description = 'any-description';

    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/todo');
    })

    test('deve retornar o mesmo valor do useCase em caso de succeso  ', async () => {
        const { successResult} = makeMocks();

    const description = 'any-description';

     const result =await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
    
    })

    test('deve retornar o mesmo valor do useCase em caso de error  ', async () => {
    const {createTodoUseCaseSpy ,errorResult} = makeMocks();
    createTodoUseCaseSpy.mockResolvedValueOnce(errorResult);

    const description = 'any-description';

    const result =await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
    })
})

const makeMocks = () => {

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

    const revalidatePathMocked = vi.mocked(revalidatePath)
    return {
        createTodoUseCaseSpy,
        revalidatePathMocked,
        errorResult,
        successResult,
    }
}