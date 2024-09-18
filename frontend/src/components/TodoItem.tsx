import classNames from 'classnames'
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiTrash } from "react-icons/tfi"
import { useContext, useEffect } from 'react'
import { TodoContext } from '../context/todoContext'
import { TodoContextType } from '../@types/todo'
import { useNavigate } from "react-router-dom"
import { deleteTodo } from "../services/todo"

interface TodoItemProps {
  done: boolean;
  title: string;
  description: string;
  _id: string;
}

function TodoItem({ done, title, description, _id }: TodoItemProps) {

  const navigate = useNavigate()
  const { todos, updateTodo } = useContext(TodoContext) as TodoContextType

  const handleCheckboxChange = () => {
    const todo = todos.find(todo => todo._id === _id)
    if (todo) {
      updateTodo({
        _id,
        done: !todo.done,
        title: todo.title,
        description: todo.description
      })
    }
  }

  useEffect(() => {

  }, [todos])

  const handleDelete = () => {
    console.log(_id);
    if (!_id) return
    deleteTodo(_id).then(() => navigate('/'))
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
      <TfiTrash className=" hover:text-primary cursor-pointer mr-2" onClick={handleDelete} />
      <BsThreeDotsVertical
        className='ml-auto'
        role='button'
        tabIndex={0}
        onClick={() => navigate(`/${_id}`)} />
    </div>
  )
}

export default TodoItem
