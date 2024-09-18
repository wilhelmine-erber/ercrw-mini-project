import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { TfiCheck, TfiTrash } from "react-icons/tfi"
import { ITodo, getTodo, deleteTodo, editTodo } from "../services/todo"
import classNames from "classnames"
import Header from '../components/Header'


function Todo() {

    const params = useParams()
    const navigate = useNavigate()

    const [todo, setTodo] = useState<ITodo>()
    const [description, setDescription] = useState(todo?.description ?? '')
    const [isDesSave, setIsDesSave] = useState(false)

    useEffect(() => {

        if (!params.id) {
            navigate('/')
            return
        }
        getTodo(params.id).then((result) => {
            setTodo(result)
            setDescription(result.description)
        })

    }, [navigate, params.id])

    const handleDelete = () => {
        if (!params.id) return
        deleteTodo(params.id).then(() => navigate('/'))
    }

    const handleDone = () => {
        if (!params.id) return
        editTodo(params.id, { done: !todo?.done }).then((result) =>
            setTodo(result)
        )
    }

    const handleEditDescription = () => {
        if (!params.id) return
        editTodo(params.id, { description }).then((result) => {
            setTodo(result)
            setDescription(result.description)
            setIsDesSave(true)
        })
    }


    return (
        <main className="m-10">
            <Header />
            <div className="flex flex-col items-center ">
                <h2 className="text-3xl mb-8 text-gray-900">Meine Aufgabe bearbeiten</h2>

                <div className="flex">
                    <h1 className={classNames('text-2xl mt-2 mr-2', { 'line-through': todo?.done })}>
                        {todo?.title}
                    </h1>

                    <div className="flex gap-2 justify-end">
                        <div className="btn btn-primary" onClick={handleDelete}>
                            <TfiTrash className="text-black hover:text-white cursor-pointer" />löschen
                        </div>

                        <div className="btn btn-primary" onClick={handleDone}>
                            <TfiCheck className="hover:text-white cursor-pointer text-black" />{todo?.done ? 'todo' : 'erledigt'}
                        </div>
                    </div>

                </div>

                <textarea
                    className="textarea textarea-bordered w-4/12 my-5"
                    placeholder="füge eine Beschreibung hinzu"
                    defaultValue={todo?.description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-primary my-2" onClick={() => navigate('/')}>zurück</button>
                {todo?.description !== description && (
                    <button
                        className="btn btn-primary my-2"
                        onClick={handleEditDescription}>speichern</button>)}
                {isDesSave && <p className="mt-5">Beschreibung gespeichert</p>}
            </div>
        </main>
    )
}

export default Todo