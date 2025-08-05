import { NavLink } from "react-router-dom"
import "./navbar.css"

function NavBar(){

    // Check if the admin is logged in
    const token = localStorage.getItem("access-token");

    return(
        <div className="navbar-container">
            <nav className="navbar">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>

                {/* For admin ONLY */}
                  {token && (
                     <NavLink to="/dashboard">Dashboard</NavLink>
                   )}
            </nav>
        </div>
        
    )
}

export default NavBar