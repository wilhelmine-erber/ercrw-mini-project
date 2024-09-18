import classNames from 'classnames'
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiTrash } from "react-icons/tfi"
import { useContext } from 'react'
import { TodoContext } from '../context/todoContext'
import { TodoContextType } from '../@types/todo'
import { useNavigate, useParams } from "react-router-dom"
import { deleteTodo } from "../services/todo"

interface TodoItemProps {
  done: boolean;
  title: string;
  description: string;
  _id: string;
}

function TodoItem({ done, title, description, _id }: TodoItemProps) {

  const params = useParams()
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


  const handleDelete = () => {
    if (!params.id) return
    deleteTodo(params.id).then(() => navigate('/'))
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










// import {ITodo} from '../services/todo'
// import classNames from 'classnames'
// import { useNavigate } from 'react-router-dom'
// import { BsThreeDotsVertical } from "react-icons/bs";

// interface Props extends ITodo {}

// function TodoItem({_id, title, description, done}:Props) {

//   const navigate = useNavigate()

//   return (
//     <div className='p-2 border-b my-2 flex items-center justify-between'>
//         <div className='mr-8 w-full'>
//           <div className='flex'>
//             <input type='checkbox' checked={done} className='mr-5'/>
//             <h1 className={classNames(
//                 'text-lg whitespace-nowrap overflow-hidden text-ellipsis',
//                 {'line-through':done}
//                 )}>{title}</h1>
//           </div>
//             <p className='text-sm text-slate-500 font-thin whitespace-nowrap overflow-hidden text-ellipsis max-w-40'>
//               {description}
//             </p>
//         </div>
//         <BsThreeDotsVertical 
//         className='ml-auto'
//         role='button'
//         tabIndex={0}
//         onClick={()=>navigate(`/${_id}`)} />
//     </div>
//   )
// }

// export default TodoItem