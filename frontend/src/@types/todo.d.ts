export interface ITodo{
    _id: string
    title: string
    description: string
    done: boolean
}

export type TodoContextType = {
    todos: ITodo[]
    error: string
    createTodo: (todo: Omit<ITodo, '_id'>) => void
    editTodo: (todo: ITodo) => void
    deleteTodo: (id: string) => void
    setTodos: (todos: ITodo[]) => void
}