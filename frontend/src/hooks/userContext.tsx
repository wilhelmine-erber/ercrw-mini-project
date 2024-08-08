import * as React from 'react'
import { UserContextType, IUser } from '../@types/user'

export const UserContext = React.createContext<UserContextType | null>(null)

const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = React.useState<IUser[]>([
        {
            id: '1',
            userName: 'test',
            email: 'test@test',
            password: 'tteesst'
        }
    ])
}

// https://blog.logrocket.com/how-to-use-react-context-typescript/