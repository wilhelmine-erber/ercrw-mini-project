// import { getTodos, createTodo, editTodo } from '../services/todo'
import { FormEvent, useState, } from 'react'
import TodoItem from './TodoItem'
import { useContext } from 'react'
import { TodoContext } from '../context/todoContext'
import { TodoContextType } from '../@types/todo'


function TodoList() {

    const todoContext = useContext(TodoContext) as TodoContextType | null;

    if (!todoContext) {
        return <div>Loading...</div>;
    }

    const { todos, createTodo } = todoContext;

    const [task, setTask] = useState('')    // ist der input

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!task) return
        createTodo( {title:task, description: '', done: false} )
    }

    return (
        <div className='flex flex-col items-center w-full '>
            <h1 className='text-3xl my-5 text-gray-900'>Produktivität steigern mit deiner Prioitätsliste</h1>

            <ul className='flex my-2 flex-col md:flex-row p-3'>
                <li className='mx-2'>
                    <div className="badge badge-primary cursor-pointer">tägliche Aufgaben</div>
                </li>
                <li className='mx-2'>
                    <div className="badge badge-secondary cursor-pointer">wöchentliche Aufgaben</div>
                </li>
                <li className='mx-2'>
                    <div className="badge badge-accent cursor-pointer">monatliche Aufgaben</div>
                </li>
            </ul>

            <form onSubmit={handleSubmit} className='flex'>
                <input
                    className='input input-bordered input-primary w-full max-w-xs mr-2'
                    placeholder='What to do?'
                    value={task}
                    onChange={(e) => setTask(e.target.value)} />

                <button type="submit" className="btn btn-primary">Save</button>
            </form>

            {/* {showSuccess && <p className='mt-5 text-cyan-500'>Task created successfully!</p>} */}


            {todos.length === 0 && <p className='mt-10'>No tasks created yet...</p>}

            <div className='mt-10 w-full md:w-1/2 lg:w-1/3'>
                {todos.map((todo) => (
                    <TodoItem key={todo._id} {...todo} />
                ))}
            </div>
        </div>
    )
}

export default TodoList