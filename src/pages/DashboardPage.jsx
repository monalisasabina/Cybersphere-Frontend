import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard(){

      const [user, setUser] = useState(null);

  //_____________________________________________________________________________________________________________
  //Getting the User details from the Backend 
  useEffect(() => {
    const token = localStorage.getItem("access-token");

    fetch("http://127.0.0.1:5555/check_session", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log(data.user)
        
        if (data.user) {
          setUser(data.user);
        } else {
          alert("Session expired or unauthorized");
        }
      });
  }, []);

  // _____________________________________________________________________________________________________________________
  // Navigating back to the homepage using the logout button
     
     const navigate = useNavigate();

    //  Handle LogOut
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
              console.warn("Sever logout failed");
            }
        
          } catch(error){
             console.error("Error during logout:", error)
          }

          localStorage.removeItem('access-token');
          localStorage.removeItem('user');
          navigate('/login')
     }



  return (
    <div>
        <div>
             <h2>Dashboard</h2>
             {user ? <img src={user.profile_pic}/>: <p> </p>}
             {user ? <p>Welcome, {user.firstname}</p> : <p>Loading user...</p>}

        </div>

        <div>
          <button 
                onClick={handleLogout}
                >Logout
          </button>

        </div>
    </div>
  );


 
}

export default Dashboard