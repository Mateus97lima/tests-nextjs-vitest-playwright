import { makeNewTodo } from "./make-new-todo";

describe('makeNewTodo (unit)', () => {
test('deve retornar uma novo  todo válido', () => {

    // AAA --> Arrange, Act, Assert//

    // Arrange --> criar as coisas  que eu preciso exemplo //

    const exempleTodoNew = {
        id: expect.any(String),
        description: 'kfhskhsfhs',
        createdAt: expect.any(String),
    };

    // Act//

    const newTodo = makeNewTodo('kfhskhsfhs')

    //Assert --> eu espero que o resultado//

    //toBe para checar valores primitivos  //
    // toStrictEqual para checar objetos//

// checando apenas a description//
    expect(newTodo.description).toBe(exempleTodoNew.description)

// checando o objeto inteiro //
    expect(newTodo).toStrictEqual(exempleTodoNew)

});

})