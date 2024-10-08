import React, { useState, createContext, useEffect } from 'react';
import { ITodo } from '../../types/ITodo'

const BASE_URL = `http://localhost:8080`

interface TodoContextType {
    todos: ITodo[] | null,
    error: string,
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>,
    createTodo: (todo: Omit<ITodo, '_id'>) => Promise<ITodo | undefined>,
    editTodo: (id: string, todo: Partial<ITodo>) => Promise<ITodo | undefined>,
    deleteTodo: (id: string) => Promise<boolean | undefined>
}

export const TodoContext = createContext<TodoContextType | null>({
    todos: null,
    error: '',
    setTodos: async () => null,
    createTodo: async () => undefined,
    editTodo: async () => undefined,
    deleteTodo: async () => false

});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {

    const [todos, setTodos] = useState<ITodo[]>([]);
    const [error, setError] = useState('')


    useEffect(() => {
        fetch(`${BASE_URL}/todo`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(async res => {
                if (res.status === 200) {
                    const result = await res.json()
                    // hier wird todos gefüllt
                    setTodos(result)
                }
            })
            .finally(() => {
                console.log('GET auf /todo', todos);
            })
    }, [])


    const createTodo = async (todo: Omit<ITodo, '_id'>) => {
        setError('')
        try {
            const res = await fetch(`${BASE_URL}/todo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(todo),
            })
            const newTodo = await res.json()
            return newTodo

        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    const editTodo = async (id: string, todo: Partial<ITodo>) => {
        try {
            const res = await fetch(`${BASE_URL}/todo/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(todo)
            })
            const newTodo = await res.json()
            return newTodo

        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    const deleteTodo = async (id: string) => {
        try {
            const res = await fetch(`${BASE_URL}/todo/${id}`, {
                method: 'DELETE'
            })
            return res.ok
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TodoContext.Provider value={{ todos, error, setTodos, createTodo, editTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}
