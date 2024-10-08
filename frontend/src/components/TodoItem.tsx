import classNames from 'classnames'
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiTrash } from "react-icons/tfi"
import { useContext, useEffect } from 'react'
import { TodoContext } from '../context/todoContext'
import { TodoContextType } from '../@types/todo'
import { useNavigate } from "react-router-dom"
import { deleteTodo, getTodos } from "../services/todo"


interface TodoItemProps {
  done: boolean;
  title: string;
  description: string;
  _id: string;
}

function TodoItem({ done, title, description, _id }: TodoItemProps) {

  const navigate = useNavigate()
  const todoContext = useContext(TodoContext) as TodoContextType | null;
  const todos = todoContext?.todos || [];
  const editTodo = todoContext?.editTodo;


  const handleCheckboxChange = () => {
    const todo = todos.find((todo: { _id: string; }) => todo._id === _id)

    if (todo) {
      editTodo && editTodo({
        _id,
        done: !todo.done,
        title: todo.title,
        description: todo.description
      })
    }
  }

  const handleDelete = () => {

    deleteTodo(_id)
      .then(() => {
        getTodos().then((result) => {
          editTodo && editTodo(result)
        })
      })
  }


  return (
    <div className='p-2 border-b my-2 flex items-center justify-between'>
      <div className='mr-8 w-full'>
        <div className='flex'>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text"></span>
              <input
                type="checkbox"
                checked={done}
                className='checkbox checkbox-primary mr-2'
                onChange={handleCheckboxChange} />

              <h1 className={classNames('',
                { 'line-through': done }
              )}>{title}</h1>
            </label>
          </div>
        </div>

        <p className='text-sm text-slate-500 font-thin whitespace-nowrap overflow-hidden text-ellipsis max-w-40'>
          {description}
        </p>
      </div>
      <button onClick={handleDelete}>
        <TfiTrash className=" hover:text-primary cursor-pointer mr-2" />
      </button>
      <BsThreeDotsVertical
        className='ml-auto'
        role='button'
        tabIndex={0}
        onClick={() => navigate(`/${_id}`)} />
    </div>
  )
}

export default TodoItem

// ganze Seite läd bei änderung nicht neu...