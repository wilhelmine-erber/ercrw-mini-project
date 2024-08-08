export interface IUser {
    id: string
    userName: string
    email: string
    password: string
}

export type UserContextType = {
    user : IUser[]
    saveUser: (user: IUser) => void
    updateUser: (id: string) => void
}