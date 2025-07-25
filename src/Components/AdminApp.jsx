import { Outlet } from "react-router-dom"
import AdminNavBar from "./AdminNavBar"
import NavBar from "./NavBar"

function AdminApp(){

    return(
        <div>
            <AdminNavBar/>
            <NavBar />
            <main>
                <Outlet/>
            </main>
            

        </div>
    )
}

export default AdminApp