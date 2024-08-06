import {ITodo, getTodos, createTodo} from '../services/todo'
import {FormEvent, useEffect, useState} from 'react'
import TodoItem from './TodoItem'

function TodoList() {

    const [todos, setTodos] = useState<ITodo[]>([])
    const [task, setTask] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(()=>{
        getTodos().then((result) => setTodos(result))
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTodo({title: task}).then((result) => {
            if(result){
                setTodos((prev)=>[result, ...prev])
                
                // setTask('') ---> funktioniert noch nicht 2-way-binding?
            
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
    <div className='flex flex-col items-center w-full'>
        <h1 className='text-3xl'>Todo</h1>
        <form onSubmit={handleSubmit}>
            <input 
            className='p-1 border rounded-md mt-5'
            placeholder='What to do?'
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

        <div className='mt-10'>
            {todos.map((todo) => (
                <TodoItem key={todo._id} {...todo} />
            ))}
        </div>
    </div>
  )
}

export default TodoList