import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { TfiCheck, TfiHome, TfiTrash } from "react-icons/tfi"
import { ITodo, getTodo, deleteTodo, editTodo } from "../services/todo"
import classNames from "classnames"

function Todo() {

    const params = useParams()
    const navigate = useNavigate()

    const [todo, setTodo] = useState<ITodo>()

    useEffect(()=>{
   
        if(!params.id){
            navigate('/')
            return
        }
        getTodo(params.id).then((result) => {
            setTodo(result)
        })

    },[navigate, params.id])

    const handleDelete = () => {
        if(!params.id) return
        deleteTodo(params.id).then(()=>navigate('/'))
    }

    const handleDone = () => {
        if(!params.id) return
        editTodo(params.id, {done: !todo?.done}).then((result) => 
            setTodo(result)
        )
    }

    


  return (
    <div className="flex flex-col items-center m-5">
        <h2 className="text-4xl mb-8">Mein Todo bearbeiten</h2>
        <TfiHome 
            className="absolute top-5 left-5 cursor-pointer bg-gray-300 size-10 p-2"
            onClick={()=>navigate('/')} />
        <div>
            <div className="flex gap-5 justify-end">
                <TfiTrash 
                    className="hover:text-red-500 cursor-pointer"
                    onClick={handleDelete} />
               
                <TfiCheck 
                    className="hover:text-green-500 cursor-pointer"
                    onClick={handleDone} />
            </div>
            <h1 className={classNames('text-2xl mt-2', {'line-through':todo?.done})}>
                {todo?.title}
            </h1>
        </div>
    </div>
  )
}

export default Todo