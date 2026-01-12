
import { createTodoAction } from "./create.todo.action";
import { makeTestTodoMocks } from "@/core/__test__/utils/make-test-todo-mocks";

vi.mock('next/cache', () => {
    return {
        revalidatePath: vi.fn(), // mock fazendo nada
    }
});

describe('CreateTodoAction (unit)', () => {
    test('deve chama createTodoUseCase com os valores corretos ', async () => {
    const {createTodoUseCaseSpy} = makeTestTodoMocks();

    const description = 'any-description';

    await createTodoAction(description);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(description);
    })

    test('deve chama revalidatePath em caso de sucesso ', async () => {
        const {revalidatePathMocked} = makeTestTodoMocks();
        const description = 'any-description';

    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
    })

    test('deve retornar o mesmo valor do useCase em caso de succeso  ', async () => {
        const { successResult} = makeTestTodoMocks();

    const description = 'any-description';

     const result =await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
    
    })

    test('deve retornar o mesmo valor do useCase em caso de error  ', async () => {
    const {createTodoUseCaseSpy ,errorResult} = makeTestTodoMocks();
    createTodoUseCaseSpy.mockResolvedValueOnce(errorResult);

    const description = 'any-description';

    const result =await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
    })
})

