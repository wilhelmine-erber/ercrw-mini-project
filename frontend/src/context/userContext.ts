import { createContext } from "react";

type UserContextProviderProps = {
    children: React.ReactNode
}


const UserContext = createContext();

export const UserContextProvider = ({children}: UserContextProviderProps) => {
    return (
        <UserContext.Provider value={}>
            {children}
        </UserContext.Provider>
    )
}
