
import { insertTestTodoDb, makeTestRepositoryTodo } from "@/core/__test__/utils/make-test-repository-todo"

describe('DrizzleTodoRpository (integration)', () => {

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

    describe('findAll', () => {
        test('deve retorna um array vazio quando não houver todos', async () => {
        const {respository} = await  makeTestRepositoryTodo();
        
        const result = await respository.findAll();
        expect(result).toStrictEqual([]);
        
        })

        test('deve retorna todos os Todos em ordem decrescente ', async () => {
    await insertTestTodoDb();
    const {respository} = await  makeTestRepositoryTodo();
    const result = await respository.findAll();

    expect(result[0].createdAt).toBe('date 4');
    expect(result[1].createdAt).toBe('date 3');
    expect(result[2].createdAt).toBe('date 2');
    expect(result[3].createdAt).toBe('date 1');
    expect(result[4].createdAt).toBe('date 0');

        })
        
    })

    describe('create', () => {
        test('criar um todo se os dados estiverem válidos', async () => {
            const {respository,todos} = await makeTestRepositoryTodo();
            const newTodo = await respository.create(todos[0]);

            expect(newTodo).toStrictEqual({
                success:true,
                todo: todos[0]
                
            })
        
        })
        test('falha se houver uma descrição igual na tabela ', async () => {
        const {respository,todos} = await makeTestRepositoryTodo();

        // criar um novo todo//
        await respository.create(todos[0]);

        // criar um todo com a mesma descrição//
            const anotherTodo = {
            id: 'any id',
            description: todos[0].description,
            createdAt: 'any date'


            }
            
            const result = await respository.create(anotherTodo) ;
        
            expect(result).toStrictEqual({
                success:false,
                errors: ['todo já existe com esse ID ou descrição']
            })

            

        })

        test('falha se houver uma ID igual na tabela ', async () => {
        
            const {respository,todos} = await makeTestRepositoryTodo();

        // criar um novo todo//
        await respository.create(todos[0]);

        // tenta criar um novo todo com a mesma ID//
        const anotherTodo = {
            id: todos[0].id,
            description: todos[0].description,
            createdAt: 'any date'

            }
            
            const result = await respository.create(anotherTodo);
        
            expect(result).toStrictEqual({
                success:false,
                errors: ['todo já existe com esse ID ou descrição']
            })
        })
    })

    describe('delete', () => {
        test('deve deletar um todo se existir', async () => {
        const {respository, todos} = await  makeTestRepositoryTodo();
            await insertTestTodoDb();
            
        const result= await respository.remove(todos[0].id);

        expect(result).toStrictEqual({
            todo:todos[0],
            success:true
        })
        })

        test('falha deletar o todo se não existir', async () => {
        const {respository} = await  makeTestRepositoryTodo();
            
            
        const result= await respository.remove('any id');


        expect(result).toStrictEqual({
            success:false,
            errors:[ "Todo não existe"]
        })
        })

        
    })
})