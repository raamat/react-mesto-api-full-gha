import { Navigate } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
function ProtectedRoute({isLoggedIn, element: Component, ...props}) {
  return (
    isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
  )
}

export default ProtectedRoute;