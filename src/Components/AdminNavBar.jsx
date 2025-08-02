import { Link, useNavigate } from "react-router-dom"

function AdminNavBar(){

    const navigate = useNavigate();

      async function handleLogout(){

          const token = localStorage.getItem('access-token');

          try{
            const response = await fetch('http://127.0.0.1:5555/logout',{
                 method: 'DELETE',
                 headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                 }
              })
            

            if (response.ok){
              console.log("Successfully logged out from server");
            }else {
              console.warn("Server logout failed");
            }
        
          } catch(error){
             console.error("Error during logout:", error)
          }

          localStorage.removeItem('access-token');
          localStorage.removeItem('user');
          navigate('/login')
 
     }

    return(
        <div>
            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/dashboard/signup">Sign Up</Link>
                <Link to="/dashboard/users">Users</Link>
                <button onClick={handleLogout}>Log Out</button>
            </nav>

        </div>
    );
}

export default AdminNavBar