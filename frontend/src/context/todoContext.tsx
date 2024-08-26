import {useState, createContext, useEffect} from 'react';
import { TodoContextType } from '../@types/todo';
import {ITodo, getTodos, createTodo} from '../services/todo'

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        getTodos().then((result) => setTodos(result))
    }, []);


    // hier kommt die Logik für das Speichern und Updaten der Todos hin
    // das heißt meine Funktionen die einen fetch machen, um die Todos zu speichern oder zu updaten
    const saveTodo = (todo: ITodo) => {
        const newTodo: ITodo={
            _id: Math.random().toString(),
            title: todo.title,
            description: todo.description,
            done: false
        }
        setTodos([...todos, newTodo]);
    }

    const updateTodo = (todo: ITodo) => {
        todos.filter((t: ITodo) =>{
            if(t._id === todo._id){
                t.done = !t.done
                setTodos([...todos])
            }
            return t
        })
    }

    return (
        <TodoContext.Provider value={{todos, saveTodo, updateTodo}}>
            {children}
        </TodoContext.Provider>
    )
}
export default TodoProvider

// https://blog.logrocket.com/how-to-use-react-context-typescript/