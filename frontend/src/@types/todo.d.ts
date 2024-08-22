export interface ITodo{
    id: string
    title: string
    description: string
    done: boolean
}

export type TodoContextType = {
    todos: ITodo[]
    saveTodo: (todo: ITodo) => void
    updateTodo: (todo: ITodo) => void
}