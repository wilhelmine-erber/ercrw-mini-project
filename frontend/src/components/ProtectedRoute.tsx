import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    isAuthenticated: boolean
    children: React.ReactNode
}

function ProtectedRoute({ isAuthenticated, children }: ProtectedRouteProps) {
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return (
        <>{children}</>
    )
}

export default ProtectedRoute