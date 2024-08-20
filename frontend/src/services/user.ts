const BASE_URL = 'http://localhost:8080'

export interface IUser {
    _id: string
    userName: string
    email: string
    password: string
}


// hier funktionen mit fetch aus backend
// wie finde ich den einen user der registriert / eingeloggt ist?

export async function getUsers(){
    try {
        const res = await fetch(`${BASE_URL}/user`)
        const result = await res.json()
        return result
        
    } catch (error) {
        console.error(error)
        return []
    }
}


// einzelnen User finden:
export async function getUser(id: string){
    try{
        const res = await fetch(`${BASE_URL}/user/${id}`)
        const result = await res.json()
        return result

    }catch(error){
        console.error(error)
        return undefined
    }
}


// createUser
export async function createUser(user: Omit<IUser, '_id'>){
    try{
        const res = await fetch(`${BASE_URL}/user`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        })
        return res

    }catch(error){
        console.error(error)
        return undefined
    }
}