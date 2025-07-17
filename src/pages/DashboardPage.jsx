import { useEffect, useState } from "react";

function Dashboard(){

      const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

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

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Welcome, {user.username}</p> : <p>Loading user...</p>}
    </div>
  );


 
}

export default Dashboard