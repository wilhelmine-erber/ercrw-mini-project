import {useContext} from 'react'
import { TodoContext } from '../context/todoContext'
import {ITodo, TodoContextType} from '../@types/todo'

function TestTodo() {

    const {todos, updateTodo} = useContext(TodoContext) as TodoContextType

    return (
        <>
        Testtodo
            <ul>
                {todos.map((todo: ITodo) => (
                    <li key={todo._id} onClick={() => updateTodo(todo)}>
                        {todo.title} - {todo.done ? 'Erledigt' : 'Nicht erledigt'}
                    </li>   
                ))}
            </ul>
        </>
      )
}

export default TestTodo