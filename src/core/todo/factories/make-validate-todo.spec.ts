import * as sanitizeStrMod from '@/utils/sanitize-str'
import { makeValidateTodo, MakeVálido } from './make-validate-todo'
import * as validateTodoDescriptionMod from '../schemas/validate-todo-description'
import * as makeNewTodoMod  from './make-new-todo'

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar sanitizeStr com o valor correto', () => {
    const { description, sanitizeStrSpy } = makeMocks()

    expect(sanitizeStrSpy).toHaveBeenCalledOnce()
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description)
  })

  test('deve chamar validateTodoDescription com o retorno de sanitizeStr', () => {
    const { description,sanitizeStrSpy ,validateTodoDescriptionSpy } = makeMocks()

    const sanitizeReturn = 'retorno da sanitizeStr'
    sanitizeStrSpy.mockReturnValue(sanitizeReturn)

   const result = makeValidateTodo(description) as MakeVálido

   console.log(result)

   
    expect(validateTodoDescriptionSpy).toHaveBeenCalledWith(sanitizeReturn)
    expect(result.success).toBe(true)
    expect(result.data).toStrictEqual(expect.objectContaining({
      id: 'any-id',
    description: 'abcd',
    createdAt: expect.any(String)
    }))
  })
})

const makeMocks = (description = 'abcd') => {
const todo = {
  id: 'any-id',
  description,
  createdAt: new Date().toISOString()
}

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description)

  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({
      errors: [],
      success: true,
    })

      const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo)

  // 🚀 execução depois dos spies
  makeValidateTodo(description)

  return {
    todo,
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy
  }
}


    // test('deve chamar makeNewTodo se validatedDescription retornou sucesso', () => {});