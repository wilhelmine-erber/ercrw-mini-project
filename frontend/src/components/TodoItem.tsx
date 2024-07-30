import {ITodo} from '../services/todo'

interface Props extends ITodo {}

function TodoItem({_id, title, description, done}:Props) {

  return (
    <div className='p-2 border rounded-md m-1 flex items-center'>
        <div className='mr-2'>
            <h1 className='text-lg max-w-40 whitespace-nowrap overflow-hidden text-ellipsis'>{title}</h1>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default TodoItem