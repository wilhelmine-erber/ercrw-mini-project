export interface IUser{
    _id: string
    username: string
    email: string
    password: string
}

export type UserContextType = {
    users: IUser[]
    saveUser: (user: IUser) => void
    updateUser: (user: IUser) => void
    isAuthenticated: boolean
    login: (userId: string) => void
    logout: () => void
}