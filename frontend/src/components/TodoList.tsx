import {ITodo, getTodos, createTodo} from '../services/todo'
import {FormEvent, useEffect, useState} from 'react'
import TodoItem from './TodoItem'

function TodoList() {

    const [todos, setTodos] = useState<ITodo[]>([])
    const [task, setTask] = useState('')

    useEffect(()=>{
        getTodos().then((result) => setTodos(result))
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTodo({title: task}).then((result) => {
            if(result){
                setTodos((prev)=>[result, ...prev])
                setTask('')
                // setTask('') ---> funktioniert noch nicht 2-way-binding?
            }
        })
    }

  return (
    <div className='flex flex-col items-center w-full'>
        <h1 className='text-3xl'>Todo</h1>
        <form onSubmit={handleSubmit}>
            <input 
            className='p-1 border rounded-md mt-5'
            placeholder='What to do?'
            onChange={(e) => setTask(e.target.value)} />
        </form>

        {todos.length === 0 && <p className='mt-10'>No tasks created yet...</p>}

        <div className='mt-10'>
            {todos.map((todo) => (
                <TodoItem key={todo._id} {...todo} />
            ))}
        </div>
    </div>
  )
}

export default TodoList