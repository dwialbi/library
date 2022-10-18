import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = () => {
  const authSelector = useSelector((state) => state.auth)

  if (!authSelector.id) {
    return <Navigate replace to="/login" />
  }
}

export default ProtectedRoute
