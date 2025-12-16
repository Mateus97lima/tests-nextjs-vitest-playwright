import * as sanitizeStrMod from '@/utils/sanitize-str';
import { makeValidateTodo } from './make-validate-todo';


describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a função sanitizeStr com o valor correto', () => {
    // Arrange
    const description = 'abcd';
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrMod, 'sanitizeStr')  // spyOn seve para obsv a função//
      .mockReturnValue(description);

    // Act
    makeValidateTodo(description);

    // Assert
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
  });
})
  // test('deve chamar a validateTodoDescription com o retorno de sanitizeStr', () => {});

    // test('deve chamar makeNewTodo se validatedDescription retornou sucesso', () => {});