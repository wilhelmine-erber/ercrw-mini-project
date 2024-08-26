import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext } from 'react'
import { TodoContext } from '../context/todoContext'
import { ITodo, TodoContextType } from '../@types/todo'

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

  return (
    <div className='p-2 border-b my-2 flex items-center justify-between'>
      <div className='mr-8 w-full'>
        <div className='flex'>
          <input
            type='checkbox'
            checked={done}
            className='mr-5'
            onChange={handleCheckboxChange}
          />
          <h1 className={classNames(
            'text-lg whitespace-nowrap overflow-hidden text-ellipsis',
            { 'line-through': done }
          )}>{title}</h1>
        </div>
        <p className='text-sm text-slate-500 font-thin whitespace-nowrap overflow-hidden text-ellipsis max-w-40'>
          {description}
        </p>
      </div>
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