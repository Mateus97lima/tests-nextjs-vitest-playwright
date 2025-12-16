import { sanitizeStr } from "@/utils/sanitize-str";
import { validadeTodoDescription } from "../schemas/validade-todo-description";
import { makeNewTodo } from "./make-new-todo";
import { Todo } from "../schemas/todo.contract";

type MakeInválido = { // fiz validate para quando for false //
    success: false,
    errors: string[],
}

type MakeVálido = { // fiz validate para quando for true //
    success: true,
    data: Todo
}

type MakeValidateTodo = MakeVálido | MakeInválido

 export function makeValidateTodo (description: string): MakeValidateTodo  {
const cleandescription = sanitizeStr(description)
const validatedescription = validadeTodoDescription(cleandescription)

if(validatedescription.success){
   return {
    success: true,
    data: makeNewTodo(cleandescription)
   }
};

return {
    success:false,
    errors: validatedescription.errors
}
}