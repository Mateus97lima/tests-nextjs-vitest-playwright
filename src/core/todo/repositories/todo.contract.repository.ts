import { Todo, TodoPresenter } from "../schemas/todo.contract";

export interface FindAllTodoRepository {
    findAll(): Promise<Todo[]>; //método que pega todos os todos//
}
export interface CreatedTodoRepository {
    create(todo: Todo): Promise<TodoPresenter>; //método que cria um todo no caso um usuário//
}
export interface DeleTodoRepository {
    remove(id: Todo): Promise<TodoPresenter>; //método que deleta um todo//
}

export interface TodoContractRepository extends FindAllTodoRepository, CreatedTodoRepository, DeleTodoRepository {}