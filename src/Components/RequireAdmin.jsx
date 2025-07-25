import { Navigate } from "react-router-dom";

function RequireAdmin({children}){

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!token || (user.role || "").toLowerCase() !=="admin"){
        return <Navigate to="/" />
    }
    return(
        children
    )
}

export default RequireAdmin