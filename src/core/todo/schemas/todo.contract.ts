export type Todo = {
    id: string;
    description: string;
    createdAt: string;

}

export type MakeInválido = { // fiz validate para quando for false //
    success: false,
    errors: string[],
}

export type MakeVálido = { // fiz validate para quando for true //
    success: true,
    todo: Todo
}

export type TodoPresenter = MakeVálido | MakeInválido