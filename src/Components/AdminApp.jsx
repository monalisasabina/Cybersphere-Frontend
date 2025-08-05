import { Outlet } from "react-router-dom"
import AdminNavBar from "./AdminNavBar"
import NavBar from "./NavBar"
import "./AdminNavBar.css"

function AdminApp(){

    return(
        <div className="admin-layout">
            
            {/* Public NavBar */}
            <header> <NavBar /></header>

            <div className="admin-body">
                {/* Admin Navbar */}
            
                  <AdminNavBar/>
              
                  {/*Main Content */}
                <main className="admin-main">
                     <Outlet/>
                </main>
            </div>

        </div>
    )
}

export default AdminApp