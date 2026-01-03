import { sanitizeStr } from "@/utils/sanitize-str";

import { makeNewTodo } from "./make-new-todo";
import {  TodoPresenter } from "../schemas/todo.contract";
import { validateTodoDescription } from "../schemas/validate-todo-description";



 export function makeValidateTodo (description: string): TodoPresenter  {
const cleandescription = sanitizeStr(description)
const validatedDescription = validateTodoDescription(cleandescription)

if(validatedDescription.success){
    
   return {
    success: true,
    todo: makeNewTodo(cleandescription)
   }
};

return {
    success:false,
    errors: validatedDescription.errors
}
}