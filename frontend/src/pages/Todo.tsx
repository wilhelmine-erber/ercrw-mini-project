import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { TfiHome } from "react-icons/tfi"
import { ITodo, getTodo } from "../services/todo"

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

    },[])


  return (
    <div className="flex flex-col items-center m-5">
        <TfiHome />
        <div>
            <h1>{todo?.title}</h1>
        </div>
    </div>
  )
}

export default Todo