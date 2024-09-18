import { createContext, useState, useEffect } from "react";
import { IUser } from '../../types/IUser'

const BASE_URL = `http://localhost:8080`

interface ContextType {
    data: IUser | null,
    error: string,
    isFetching: boolean,
    login: (body: any) => Promise<number>,
    register: (body: any) => Promise<number>,
    logout: () => void,
    update: (body: any) => Promise<number>
}

export const UserContext = createContext<ContextType>({
    data: null,
    error: '',
    isFetching: false,
    login: async () => 0,
    register: async () => 0,
    logout: async () => 0,
    update: async () => 0,
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<IUser | null>(null)
    const [error, setError] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        fetch(`${BASE_URL}/user`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(async res => {
                if (res.status === 200) {
                    const result = await res.json()
                    setUser(result)
                }
            })
            .finally(() => {
                setReady(true)
            })
    }, [])

    const login = async (body: any) => {
        setError('')
        setIsFetching(true)
        const res = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body })
        })

        const result = await res.json();

        if (res.status === 200) {
            setUser(result);
        } else if (result.errors) {
            setError(result.errors[0].msg)
        } else if (result.error) {
            setError(result.error)
        }

        setIsFetching(false)

        return res.status
    }

    const register = async (body: any) => {
        setError('')
        setIsFetching(true)

        const formData = new FormData()
        formData.append('firstname', body.firstname)
        formData.append('lastname', body.lastname)
        formData.append('email', body.email)
        formData.append('password', body.password)

        const res = await fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })

        const result = await res.json()

        if (res.status === 200) {
            setUser(result)
        } else if (result.errors) {
            setError(result.errors[0].msg)
        } else if (result.error) {
            setError(result.error)
        }

        setIsFetching(false)

        return res.status
    }

    const logout = async () => {
        await fetch(`${BASE_URL}/user/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        setUser(null)
    }

    const update = async (body: any) => {
        setError('')
        setIsFetching(true)

        const formData = new FormData()
        formData.append('firstname', body.firstname)
        formData.append('file', body.profilePic)

        const res = await fetch(`${BASE_URL}/user`, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        })

        const result = await res.json()

        if (res.status === 200) {
            setUser(result)
        }
        else if (result.errors) {
            setError(result.errors[0].msg)
        }
        else if (result.error) {
            setError(result.error)
        }

        setIsFetching(false)

        return res.status
    }

    return (
        <UserContext.Provider value={{ data: user, error, isFetching, login, register, logout, update }}>
            {ready && children}
        </UserContext.Provider>
    )
}

export default UserProvider
// todo: userContext in app.tsx einbinden!