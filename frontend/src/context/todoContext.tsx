import { useState, createContext, useEffect } from 'react';
import { TodoContextType } from '../@types/todo';
import { ITodo, getTodos, createTodo, editTodo } from '../services/todo'

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        getTodos().then((result) => setTodos(result))
    }, []);


    const saveTodo = (todo: ITodo) => {
        createTodo(todo).then((result) => {
            if (result) setTodos((prev) => [result, ...prev])
        })
    }

    const updateTodo = (todo: ITodo) => {
        editTodo(todo._id, todo).then((result) => {
            if (result) {
                setTodos((prev) => {
                    const index = prev.findIndex((t) => t._id === todo._id)
                    if (index === -1) return prev
                    const newTodos = [...prev]
                    newTodos[index] = result
                    return newTodos
                })
            }
        })
    }

    return (
        <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>
            {children}
        </TodoContext.Provider>
    )
}
export default TodoProvider