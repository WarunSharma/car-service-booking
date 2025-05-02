import { JSX } from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
}

function ProtectedRoute({children}: {children: JSX.Element}) {
  return isAuthenticated() ? children : <Navigate to={"/login"} replace/>
}

export default ProtectedRoute;