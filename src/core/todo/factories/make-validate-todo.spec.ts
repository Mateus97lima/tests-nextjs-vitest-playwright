import * as sanitizeStrMod from "@/utils/sanitize-str";
import {
  MakeInválido,
  makeValidateTodo,
  MakeVálido,
} from "./make-validate-todo";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";
import * as makeNewTodoMod from "./make-new-todo";

describe("makeValidatedTodo (unit)", () => {
  test("deve chamar sanitizeStr com o valor correto", () => {
    const { description, sanitizeStrSpy } = makeMocks();

    expect(sanitizeStrSpy).toHaveBeenCalledOnce();
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
  });

  test("deve chamar validateTodoDescription com o retorno de sanitizeStr", () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();

    const sanitizeReturn = "retorno da sanitizeStr";
    sanitizeStrSpy.mockReturnValue(sanitizeReturn);

    const result = makeValidateTodo(description) as MakeVálido;

    console.log(result);

    expect(validateTodoDescriptionSpy).toHaveBeenCalledWith(sanitizeReturn);
  });

  test("deve chamar makeNewTodo se validatedDescription retornou sucesso", () => {
    const { description } = makeMocks();
    const result = makeValidateTodo(description) as MakeVálido;

    expect(result.success).toBe(true);
    expect(result.data).toStrictEqual(
      expect.objectContaining({
        id: "any-id",
        description: "abcd",
        createdAt: expect.any(String),
      })
    );
  });

  test("deve chamar validateDescription.error se a validação falhou", () => {
   
    const {errors, description, validateTodoDescriptionSpy } = makeMocks();
    validateTodoDescriptionSpy.mockReturnValue({ errors, success: false,
    });
    const result = makeValidateTodo(description) as MakeInválido;

    expect(result).toStrictEqual({ errors,success: false,});
  });
});

const makeMocks = (description = "abcd") => {
   const errors = ["any", "error"];
  const todo = { id: "any-id", description, createdAt: new Date().toISOString(), };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, "sanitizeStr")
    .mockReturnValue(description);

  const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, "validateTodoDescription")
    .mockReturnValue({
      errors: [],
      success: true,
    });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, "makeNewTodo")
    .mockReturnValue(todo);

  // 🚀 execução depois dos spies
  makeValidateTodo(description);

  return {
    errors,
    todo,
    description,
    sanitizeStrSpy,
    validateTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};

// ;
