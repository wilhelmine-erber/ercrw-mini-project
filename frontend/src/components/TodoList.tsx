import { getTodos, createTodo } from '../services/todo'
import { FormEvent, useState, } from 'react'
import TodoItem from './TodoItem'
import { useContext } from 'react'
import { TodoContext } from '../context/todoContext'
import { TodoContextType } from '../@types/todo'

// beim check eines todos wird das nicht im context gespeichert
// das muss noch gemacht werden
// funktionen zum update noch hinzufügen
// funktionen zum löschen noch hinzufügen



function TodoList() {

    const { todos, updateTodo } = useContext(TodoContext) as TodoContextType

    const [task, setTask] = useState('')    // ist der input

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // createTodo({ title: task }).then((result) => {    // erstelle neuen task
        //     if (result) { // wenn task erstellt wurde, dann füge ihn in die liste ein
        //         updateTodo((prev: any) => [result, ...prev]) // füge neuen task in liste ein
        //         setTask('')
        //     }
        // })
    }

    return (
        <div className='flex flex-col items-center w-full '>
            <h1 className='text-3xl my-10 text-gray-900'>Aufgaben</h1>

            <ul className='flex my-2 flex-col md:flex-row border rounded-lg p-3'>
                <li className='mx-2'>
                    <div className="badge badge-primary badge-outline">tägliche Aufgaben</div>
                </li>
                <li className='mx-2'>
                    <div className="badge badge-secondary badge-outline">wöchentliche Aufgaben</div>
                </li>
                <li className='mx-2'>
                    <div className="badge badge-accent badge-outline">monatliche Aufgaben</div>
                </li>
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    className='p-1 border rounded-md mt-5'
                    placeholder='What to do?'
                    value={task}
                    onChange={(e) => setTask(e.target.value)} />
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-2"
                >
                    Save
                </button>
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