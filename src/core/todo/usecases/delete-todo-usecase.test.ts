import { makeTestRepositoryTodo } from "@/core/__test__/utils/make-test-repository-todo";
import { deleteTodoUseCase } from "./delete-todo-usecase";


describe('deleteTodoUseCase (integration)', () => {

beforeEach(async () => {
        const {deleteTodoNoWhere} = await  makeTestRepositoryTodo();   // para uma banco de dados falso sem mexe com os verdadeiros componentes//
        await deleteTodoNoWhere();
    console.log('executo antes de cada teste')
    })
    afterAll(async () => {
        const {deleteTodoNoWhere} = await  makeTestRepositoryTodo();
        await deleteTodoNoWhere()
    console.log('executo depois de cada teste')
    })


    test('deve retorna erro se o Id for inválido' , async () => {
        const result = await deleteTodoUseCase('') 

        expect(result).toStrictEqual({
        errors: [
    'ID inválido',
],
success:false,
        })
    })

    test('deve retorna sucesso se o TODO estiver na base de dados', async () => {
    const {insertTodoDb, todos} =  await makeTestRepositoryTodo()
    await insertTodoDb().values(todos);       // peguei o todos os TODOS e selecionei um para ele deletar //

    const result = await deleteTodoUseCase(todos[0].id)

    expect(result).toStrictEqual({
        success:true,
        todo: todos[0]
    })
    })

    test('deve retorna erro se o TODO  não existe na base de dados', async () => {
        const description = 'descrição válida'; 
            const result = await deleteTodoUseCase(description);   // fiz um TODO e mandei para deletar para dar o erro que não existe na base de dados//
        
            expect(result).toStrictEqual({
            "errors": [
        "Todo não existe",
        ],
        "success": false,
            });
    })
})