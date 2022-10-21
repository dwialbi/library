import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const GuestRoute = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)

  if (authSelector) {
    return <Navigate to="/" />
  }

  return children
}

export default GuestRoute
