import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { TfiCheck, TfiHome, TfiTrash } from "react-icons/tfi"
import { ITodo, getTodo, deleteTodo, editTodo } from "../services/todo"
import classNames from "classnames"
import Header from '../components/Header'


function Todo() {

    const params = useParams()
    const navigate = useNavigate()

    const [todo, setTodo] = useState<ITodo>()
    const [description, setDescription] = useState(todo?.description ?? '')
    const [isDesSave, setIsDesSave] = useState(false)

    useEffect(()=>{
   
        if(!params.id){
            navigate('/')
            return
        }
        getTodo(params.id).then((result) => {
            setTodo(result)
            setDescription(result.description)
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

    const handleEditDescription=()=>{
        if(!params.id) return
        editTodo(params.id, {description}).then((result) => {
            setTodo(result)
            setDescription(result.description)
            setIsDesSave(true)
        })
    }
    

  return (
    <main className="m-10">
        <Header />
    <div className="flex flex-col items-center">
        <h2 className="text-3xl mb-8 text-gray-900">Meine Aufgabe bearbeiten</h2>
        
        <div>
            <div className="flex gap-5 justify-end">
                <div className="bg-indigo-600 rounded-md px-2 py-1">
                <TfiTrash 
                    className="text-white hover:text-red-500 cursor-pointer"
                    onClick={handleDelete} />
                </div>
               
               <div className="bg-indigo-600 rounded-md px-2 py-1">

                <TfiCheck 
                    className="hover:text-green-500 cursor-pointer bg-indigo-600 text-white rounded-md"
                    onClick={handleDone} />
               </div>
            </div>
            <h1 className={classNames('text-2xl mt-2', {'line-through':todo?.done})}>
                {todo?.title}
            </h1>
        </div>
        
        <textarea 
            className="p-1 border mt-5 min-w-60"
            placeholder="füge eine Beschreibung hinzu"
            defaultValue={todo?.description}
            onChange={(e)=>setDescription(e.target.value)}
         />
         <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-2" onClick={()=>navigate('/')}>zurück</button>
        {todo?.description !== description && (
            <button 
                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleEditDescription}>speichern</button>)}
        {isDesSave && <p className="mt-5">Beschreibung gespeichert</p>}
    </div>
    </main>
  )
}

export default Todo