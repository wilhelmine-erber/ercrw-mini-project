import {useState, createContext} from 'react';
import { TodoContextType, ITodo } from '../@types/todo';

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [todos, setTodos] = useState<ITodo[]>([
        {
            id: '1',
            title: 'Einkaufen',
            description: 'Eier, Milch, Butter',
            done: false
        },
        {
            id: '2',
            title: 'Aufräumen',
            description: 'Wohnzimmer saugen',
            done: false
        }
    ]);

    // hier kommt die Logik für das Speichern und Updaten der Todos hin
    // das heißt meine Funktionen die einen fetch machen, um die Todos zu speichern oder zu updaten
    const saveTodo = (todo: ITodo) => {
        const newTodo: ITodo={
            id: Math.random().toString(),
            title: todo.title,
            description: todo.description,
            done: false
        }
        setTodos([...todos, newTodo]);
    }

    const updateTodo = (todo: ITodo) => {
        todos.filter((t: ITodo) =>{
            if(t.id === todo.id){
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