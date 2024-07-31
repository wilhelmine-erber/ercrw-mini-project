import {ITodo} from '../services/todo'
import { TfiPencil } from 'react-icons/tfi'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface Props extends ITodo {}

function TodoItem({_id, title, description, done}:Props) {

  const navigate = useNavigate()

  return (
    <div className='p-2 border rounded-md m-1 flex items-center justify-between'>
        <div className='mr-8'>
            <h1 className={classNames(
              'text-lg max-w-40 whitespace-nowrap overflow-hidden text-ellipsis',
              {'line-through':done}
              )}>{title}</h1>
            <p>{description}</p>
        </div>
        <TfiPencil 
        className='ml-auto'
        role='button'
        tabIndex={0}
        onClick={()=>navigate(`/${_id}`)} />
    </div>
  )
}

export default TodoItem