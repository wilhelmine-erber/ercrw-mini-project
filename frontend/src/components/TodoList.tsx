import {ITodo, getTodos, createTodo} from '../services/todo'
import {FormEvent, useEffect, useState, } from 'react'
import TodoItem from './TodoItem'


function TodoList() {


    const [todos, setTodos] = useState<ITodo[]>([]) // sind daten von backend
    const [task, setTask] = useState('')    // ist der input
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(()=>{
        getTodos().then((result) => setTodos(result))
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTodo({title: task}).then((result) => {    // erstelle neuen task
            if(result){ // wenn task erstellt wurde, dann füge ihn in die liste ein
                setTodos((prev)=>[result, ...prev]) // füge neuen task in liste ein
                setTask('')
            }
        })

    // status kommt von fetch
    //    console.log(createTodo.status)
    //     if(createTodo.status === 200){
    //         setShowSuccess(true)
    //         setTimeout(()=>setShowSuccess(false), 4000)
    //     }
    }

  return (
    <div className='flex flex-col items-center w-full '>
        <h1 className='text-3xl my-10 text-gray-900'>Aufgaben für heute</h1>

        <ul className='flex my-2 flex-col md:flex-row'>
            <li className='mx-2'>tägliche Aufgaben</li>
            <li className='mx-2'>wöchentliche Aufgaben</li>
            <li className='mx-2'>monatliche Aufgaben</li>
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