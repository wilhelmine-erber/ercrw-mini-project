const BASE_URL = 'http://localhost:8080'

export interface ITodo {
    _id: string
    title: string
    description?: string
    done?: boolean
}

// hier Funktionen mit fetch aus backend
// getTodos

export async function getTodos(){
    try{
        const res = await fetch(`${BASE_URL}/todo`)
        const result = await res.json()
        return result

    }catch(error){
        console.error(error)
        return []
    }
}


// getTodo

export async function getTodo(id: string){
    try{
        const res = await fetch(`${BASE_URL}/todo/${id}`)
         const result = await res.json()
         console.log(result);
         return result


    }catch(error){
        console.error(error)
        return undefined
    }
}


// createTodo

export async function createTodo(todo: Omit<ITodo, '_id'>){
    try{
        const res = await fetch(`${BASE_URL}/todo`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todo),
        })
        const newTodo = await res.json()
        return newTodo

    }catch(error){
        console.error(error)
        return undefined
    }
}

// editTodo

export async function editTodo(id: string, todo: Partial<ITodo>){
    try{
        const res = await fetch(`${BASE_URL}/todo/${id}`, {
            method:'PUT',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(todo),
        })
        const newTodo = await res.json()
        return newTodo

    }catch(error){
        console.error(error)
        return undefined
    }
}


// deleteTodo

export async function deleteTodo(id: string){
    try{
        const res = await fetch(`${BASE_URL}/todo/${id}`, {
            method: 'DELETE'
        })
        return res.ok

    }catch(error){
        console.error(error)
    }
}