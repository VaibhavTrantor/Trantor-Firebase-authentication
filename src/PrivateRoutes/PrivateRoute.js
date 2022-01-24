import { Navigate } from "react-router-dom"
import { useAuth } from "../Context/Authcontext"


const PrivateRoute = ({children}) => {
    const {currentuser} = useAuth()
    return currentuser ? children : <Navigate to='/login'/>
}

export default PrivateRoute
