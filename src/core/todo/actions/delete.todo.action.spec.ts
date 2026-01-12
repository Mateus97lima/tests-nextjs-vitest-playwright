

import { deleteTodoAction } from "./delete.todo.action";
import { makeTestTodoMocks } from "@/core/__test__/utils/make-test-todo-mocks";

vi.mock('next/cache', () => {
    return {
        revalidatePath: vi.fn(), // mock fazendo nada
    }
});

describe('DeleteTodoAction (unit)', () => {
    test('deve chama deleteTodoUseCase com os valores corretos ', async () => {
    const { deleteTodoUseCaseSpy} = makeTestTodoMocks();

    const fakeId = 'any-ID';


    await deleteTodoAction(fakeId);

    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(fakeId);
    })

    test('deve chama revalidatePath em caso de sucesso  ', async () => {
        const {revalidatePathMocked} = makeTestTodoMocks();
        const fakeId = 'any-Id';

    await deleteTodoAction(fakeId);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
    })

    test('deve retornar o mesmo valor do useCase em caso de succeso  ', async () => {
        const { successResult} = makeTestTodoMocks();

    const fakeId = 'any-Id';

    const result =await deleteTodoAction(fakeId);

    expect(result).toStrictEqual(successResult);
    
    })

    test('deve retornar o mesmo valor do useCase em caso de error  ', async () => {
    const {deleteTodoUseCaseSpy ,errorResult} = makeTestTodoMocks();
    deleteTodoUseCaseSpy.mockResolvedValueOnce(errorResult);

    const fakeId = 'any-description';

    const result =await deleteTodoAction(fakeId);

    expect(result).toStrictEqual(errorResult);
    })
})

