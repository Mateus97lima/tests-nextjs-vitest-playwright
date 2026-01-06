import { makeTestRepositoryTodo } from "@/core/__test__/utils/make-test-repository-todo";
import { createTodoUseCase } from "./create-todo.usecase";
import { MakeInválido, MakeVálido } from "../schemas/todo.contract";

describe('CreateTodoUseCase (integration)', () => {

beforeEach(async () => {
        const {deleteTodoNoWhere} = await  makeTestRepositoryTodo();
        await deleteTodoNoWhere();
    console.log('executo antes de cada teste')
    })
    afterAll(async () => {
        const {deleteTodoNoWhere} = await  makeTestRepositoryTodo();
        await deleteTodoNoWhere()
    console.log('executo depois de cada teste')
    })


    test('deve retorna um erro se a validação falhar', async () => {
        const result = await createTodoUseCase('') as MakeInválido;

        expect(result.success).toBe(false); 
        expect(result.errors).toHaveLength(1);
    })

    test('deve retornar um TODO se a validação passar', async () => {
    const description = 'descrição válida'; 
    const result = await createTodoUseCase(description) as MakeVálido;

    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
    "createdAt": expect.any(String),
    description,
    "id": expect.any(String),
    });
        
        
    })

        test('deve retornar error se o repository falhar', async () => {
        // criar um Todo uma vez //
    const description = 'descrição válida'; 
     await createTodoUseCase(description) as MakeVálido;

     //tentar recriar o TODO e deve retorna error //
    const result = await createTodoUseCase(description) as  MakeInválido;

    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
        "todo já existe com esse ID ou descrição"
    ]);
        
    })
})