import { Todo } from "../schemas/todo.contract";

export function makeNewTodo (description: string): Todo {
    return {   // espero que eu chame essa função e que ela returne o objeto//
        id: crypto.randomUUID(),
        description,
        createdAt: new Date ().toISOString(),
    };
}