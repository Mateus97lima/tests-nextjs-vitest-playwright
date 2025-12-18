import { sanitizeStr } from "@/utils/sanitize-str";

import { makeNewTodo } from "./make-new-todo";
import { Todo } from "../schemas/todo.contract";
import { validateTodoDescription } from "../schemas/validate-todo-description";

export type MakeInválido = { // fiz validate para quando for false //
    success: false,
    errors: string[],
}

export type MakeVálido = { // fiz validate para quando for true //
    success: true,
    data: Todo
}

export type MakeValidateTodo = MakeVálido | MakeInválido

 export function makeValidateTodo (description: string): MakeValidateTodo  {
const cleandescription = sanitizeStr(description)
const validatedDescription = validateTodoDescription(cleandescription)

if(validatedDescription.success){
    
   return {
    success: true,
    data: makeNewTodo(cleandescription)
   }
};

return {
    success:false,
    errors: validatedDescription.errors
}
}