import { NavLink } from "react-router-dom"
import "./navbar.css"
import logo from "../Pictures/ChatGPT Image Aug 8, 2025, 01_54_23 PM.png"

function NavBar(){

    // Check if the admin is logged in
    const token = localStorage.getItem("access-token");

    return(
        <div className="navbar-container">
            <nav className="navbar">
                <NavLink to="/" className="navbar-logo"> <img src={logo} alt="Logo" /> </NavLink>
                

                <div className="navbar-links">

                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>

                     {/* For admin ONLY */}
                    {token && (
                      <>
                        {/* <NavLink to="/login">Login</NavLink> */}
                        <NavLink to="/dashboard">Dashboard</NavLink>
                      </>
                    )} 
                </div>

               
            </nav>
        </div>
        
    )
}

export default NavBar